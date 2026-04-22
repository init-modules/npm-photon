# Photon Forms

`@init/photon/forms` - отдельный subpath для унифицированного API форм в Photon.

Код форм должен жить внутри `src/forms/*` и импортироваться через:

```ts
import {
  PhotonForm,
  createPhotonFormFieldsField,
  definePhotonForm,
  type PhotonFormFieldDefinition,
} from "@init/photon/forms";
```

Root export `@init/photon` намеренно не является основным местом для form API. Так формы остаются отдельным модулем пакета и не расползаются по core namespace.

## Задача модуля

Forms API решает две проблемы:

- runtime-форма рендерится из единой schema, а не из локальных JSX-массивов в каждом блоке;
- builder получает редактируемый набор полей с политиками: какие поля обязательны, какие можно добавлять, удалять, переставлять и какие типы разрешены.

Это позволяет commerce, auth, publication и будущим пакетам использовать один подход для checkout, profile settings, lead forms, comments и других пользовательских форм.

## Основные сущности

`PhotonFormFieldDefinition` описывает одно поле:

```ts
type PhotonFormFieldDefinition = {
  id: string;
  name: string;
  type: "text" | "email" | "phone" | "number" | "textarea" | "select" | "checkbox" | "date" | "hidden";
  label: string;
  placeholder?: string;
  helpText?: string;
  required?: boolean;
  defaultValue?: unknown;
  options?: Array<{ label: string; value: string }>;
  width?: "full" | "half" | "third";
  locked?: boolean;
  removable?: boolean;
  disabled?: boolean;
};
```

`PhotonFormDefinition` описывает форму и ее policy:

```ts
const checkoutForm = definePhotonForm({
  id: "commerce.checkout",
  mode: "extendable",
  defaultFields: [
    { id: "name", name: "name", type: "text", label: "Name", required: true },
    { id: "email", name: "email", type: "email", label: "Email", required: true },
  ],
  policy: {
    allowedFieldTypes: ["text", "email", "phone", "textarea", "select"],
    requiredFieldIds: ["name", "email"],
    lockedFieldIds: ["name", "email"],
    allowAddFields: true,
    allowRemoveFields: false,
    allowReorder: true,
    allowEditFieldNames: false,
  },
});
```

## Режимы формы

`fixed`

Жесткий набор из `defaultFields`. Подходит для системных форм, где состав нельзя менять. Labels/placeholders можно редактировать, если блок это разрешает через fields/localization schema.

`extendable`

Есть обязательное ядро, но сверху можно добавлять поля. Это основной режим для checkout/profile forms: `name/email/phone` остаются обязательными, а проект добавляет комментарий, адрес, компанию и т.д.

`freeform`

Пакет дает стартовый набор, но проект может полностью менять состав. Использовать осторожно, когда backend действительно готов принять произвольный payload.

## Политики

Policy применяется в `resolvePhotonFormFields`.

- `allowedFieldTypes`: whitelist типов.
- `deniedFieldTypes`: blacklist типов.
- `requiredFieldIds`: поля всегда должны быть в форме.
- `lockedFieldIds`: поля считаются заблокированными.
- `removableFieldIds`: явный список удаляемых полей.
- `allowAddFields`: можно добавлять поля.
- `allowRemoveFields`: можно удалять поля.
- `allowReorder`: можно менять порядок.
- `allowEditFieldNames`: можно менять `name`. По умолчанию для backend-sensitive форм лучше `false`.

Важно: policy не заменяет backend validation. Она управляет builder UX и runtime schema, но сервер все равно должен валидировать итоговый payload.

## Поле блока для schema

Чтобы блок получил редактор полей в inspector, добавьте `createPhotonFormFieldsField` в `fields` block definition:

```ts
const checkoutFormFieldsField = createPhotonFormFieldsField("fields", {
  label: "Checkout fields",
  description: "Runtime checkout form schema.",
  addLabel: "Add checkout field",
  allowedFieldTypes: ["text", "email", "phone", "textarea", "select", "checkbox"],
});

export const checkoutBlock = definePhotonBlockDefinition({
  // ...
  defaults: {
    fields: createPhotonLocalizedDefault({
      en: checkoutForm.defaultFields,
      ru: [
        { ...checkoutForm.defaultFields[0], label: "Имя" },
        { ...checkoutForm.defaultFields[1], label: "Email" },
      ],
    }),
  },
  fields: [
    checkoutFormFieldsField,
  ],
});
```

`form-fields` - специализированный field kind. Он не использует обычный nested repeater, потому что для форм обычный repeater быстро превращается в лабиринт, особенно вокруг `options`. Редактор раскрывает одно поле за раз и показывает `options` только для `select`.

## Runtime render

`PhotonForm` принимает definition, fields и submit handler:

```tsx
<PhotonForm
  blockId={block.id}
  fieldsPath="fields"
  definition={checkoutForm}
  fields={block.props.fields}
  disabled={status === "saving"}
  classNames={{
    field: "grid gap-2 text-sm font-medium",
    input: "rounded-full border px-4 py-3",
    helpText: "text-xs opacity-70",
    checkboxField: "flex items-center gap-3",
  }}
  onSubmitValues={async (values) => {
    await submit(values);
  }}
>
  <button type="submit">Submit</button>
</PhotonForm>
```

`PhotonForm`:

- применяет `resolvePhotonFormFields`;
- рендерит inputs по schema;
- читает значения через `readPhotonFormValues`;
- отдает `values` в `onSubmitValues`;
- для labels/helpText использует inline editable rendering, если переданы `blockId` и `fieldsPath`.

## Inline editing и fallback

Если поле появилось в новой версии блока, старые документы могут не иметь этого prop path. Для таких мест используйте `placeholder` у `EditableText` или `EditableTextarea`.

Активный inline input теперь открывается со значением fallback placeholder, если реального значения еще нет. Это нужно, чтобы старые профили можно было редактировать без пустого input при клике по видимому тексту.

## Localization schema

Для новых блоков `form-fields` автоматически регистрирует типовые пути:

Localized:

- `fields.*.label`
- `fields.*.placeholder`
- `fields.*.helpText`
- `fields.*.options.*.label`

Shared:

- `fields.*.id`
- `fields.*.name`
- `fields.*.type`
- `fields.*.width`
- `fields.*.required`
- `fields.*.disabled`
- `fields.*.locked`
- `fields.*.removable`
- `fields.*.options.*.value`

Если блок уже существовал и в документах есть старые props, лучше явно задать `localizationSchema` и оставить старые paths там для backward compatibility.

## Backward compatibility

При миграции старого блока:

1. Добавьте новый `fields` prop.
2. Оставьте старые props в типе как optional, например `nameLabel?: string`.
3. В runtime делайте fallback из старых props, если `fields` отсутствует.
4. В `localizationSchema` оставьте старые paths, чтобы сохранение старых документов не падало.
5. После того как документы пересохранены и миграция завершена, старые props можно удалить отдельным breaking change.

## Когда не использовать

Не используйте forms module для:

- статичных декоративных блоков без пользовательского submit;
- сложных domain-specific editors, где нужна отдельная предметная модель;
- backend validation вместо server-side правил.

Forms API задает frontend schema и builder UX. Серверная модель и безопасность остаются ответственностью доменного пакета.
