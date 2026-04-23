const randomSegment = () => Math.random().toString(36).slice(2, 10);

export const createPhotonNodeId = () => `photon_${randomSegment()}`;
