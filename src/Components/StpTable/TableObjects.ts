import { StpTypeProps } from "../../Interfaces/Types";


export type StpItem = {
    cams: number
    depth: number
    Ro: number
    Rw: number
    Lt: number
    Lr: number
    Ra: number
    Det: number
    Er: number
    Ea: number
    Sf: number
    Sc: number
    S: number
    weight: number
    secure: "P2A" | "none"
    name: string
    _type: StpTypeProps
}
export const StpItems: StpItem[] = [
    {
        cams: 1, depth: 24, Ro: 1.00, Rw: 36, Lt: 65, Lr: 17, Ra: 94, Det: 30, Er: 41, Ea: 29, Sf: 36, Sc: 0.41, S: 1.81, weight: 37, secure: "P2A", name: "3.3.1-14Ar-4Эл", _type: { hitproof: true, soundproof: true, multi: true },
    },
    {
        cams: 1, depth: 24, Ro: 1.00, Rw: 36, Lt: 65, Lr: 17, Ra: 95, Det: 32, Er: 41, Ea: 27, Sf: 36, Sc: 0.41, S: 1.81, weight: 35, secure: "none", name: "4-16Ar-4Эл", _type: { multi: true },
    },
    {
        cams: 1, depth: 24, Ro: 1.25, Rw: 33, Lt: 66, Lr: 17, Ra: 95, Det: 32, Er: 41, Ea: 27, Sf: 36, Sc: 0.41, S: 1.83, weight: 30, secure: "none", name: "4TopN-14Ar-6(FHcl)", _type: { soundproof: true, solarproof: true, energy: true },
    },
    {
        cams: 1, depth: 24, Ro: 1.11, Rw: 33, Lt: 66, Lr: 17, Ra: 95, Det: 33, Er: 41, Ea: 26, Sf: 36, Sc: 0.41, S: 1.83, weight: 30, secure: "none", name: "4TopN-16Ar-4(FHcl)", _type: { solarproof: true, energy: true },
    },
    {
        cams: 1, depth: 24, Ro: 1.00, Rw: 33, Lt: 66, Lr: 17, Ra: 95, Det: 33, Er: 41, Ea: 26, Sf: 36, Sc: 0.41, S: 1.83, weight: 30, secure: "none", name: "6TopN-10Ar-4.4.1", _type: { hitproof: true, soundproof: true, energy: true },
    },
    {
        cams: 1, depth: 24, Ro: 0.91, Rw: 33, Lt: 66, Lr: 17, Ra: 95, Det: 32, Er: 41, Ea: 27, Sf: 36, Sc: 0.41, S: 1.83, weight: 30, secure: "none", name: "4TopN-12Ar-4.4.1", _type: { hitproof: true, soundproof: true, energy: true },
    },
    {
        cams: 1, depth: 24, Ro: 0.91, Rw: 35, Lt: 71, Lr: 13, Ra: 95, Det: 34, Er: 40, Ea: 26, Sf: 38, Sc: 0.44, S: 1.87, weight: 27, secure: "P2A", name: "4TopN-14Ar-3.3.1", _type: { hitproof: true, soundproof: true, energy: true },
    },
    {
        cams: 1, depth: 24, Ro: 1.00, Rw: 36, Lt: 71, Lr: 13, Ra: 95, Det: 35, Er: 40, Ea: 25, Sf: 38, Sc: 0.44, S: 1.87, weight: 25, secure: "none", name: "4-16Ar-4Сбр", _type: { solarproof: true },
    },
    {
        cams: 1, depth: 24, Ro: 1.00, Rw: 30, Lt: 72, Lr: 13, Ra: 96, Det: 36, Er: 40, Ea: 24, Sf: 38, Sc: 0.44, S: 1.89, weight: 20, secure: "none", name: "4TopN-16-4", _type: { simple: true },
    },
    {
        cams: 1, depth: 24, Ro: 0.91, Rw: 31, Lt: 72, Lr: 13, Ra: 96, Det: 36, Er: 40, Ea: 24, Sf: 39, Sc: 0.45, S: 1.85, weight: 20, secure: "none", name: "4-12-4.4.1", _type: { hitproof: true, soundproof: true },
    },
    {
        cams: 1, depth: 24, Ro: 1.00, Rw: 33, Lt: 52, Lr: 40, Ra: 97, Det: 35, Er: 42, Ea: 23, Sf: 43, Sc: 0.49, S: 1.21, weight: 30, secure: "none", name: "6-10-4.4.1", _type: { hitproof: true, soundproof: true },
    },
    {
        cams: 1, depth: 24, Ro: 0.91, Rw: 36, Lt: 56, Lr: 36, Ra: 96, Det: 39, Er: 41, Ea: 20, Sf: 46, Sc: 0.53, S: 1.22, weight: 25, secure: "none", name: "4-14-3.3.1", _type: { hitproof: true, soundproof: true },
    },
    {
        cams: 1, depth: 24, Ro: 0.91, Rw: 31, Lt: 56, Lr: 37, Ra: 96, Det: 40, Er: 43, Ea: 17, Sf: 47, Sc: 0.54, S: 1.19, weight: 20, secure: "none", name: "4-14-6", _type: { soundproof: true },
    },
    {
        cams: 1, depth: 24, Ro: 0.91, Rw: 30, Lt: 56, Lr: 37, Ra: 96, Det: 40, Er: 43, Ea: 17, Sf: 47, Sc: 0.54, S: 1.19, weight: 20, secure: "none", name: "4-16-4", _type: { simple: true },
    },
    {
        cams: 2, depth: 24, Ro: 0.83, Rw: 39, Lt: 69, Lr: 18, Ra: 95, Det: 40, Er: 21, Ea: 39, Sf: 49, Sc: 0.56, S: 1.41, weight: 46, secure: "P2A", name: "4-6-4-6-4", _type: { simple: true },
    },
    {
        cams: 1, depth: 26, Ro: 1.00, Rw: 37, Lt: 70, Lr: 18, Ra: 95, Det: 41, Er: 21, Ea: 38, Sf: 49, Sc: 0.56, S: 1.43, weight: 41, secure: "P2A", name: "6-14Ar-4Эл", _type: { multi: true, soundproof: true },
    },
    {
        cams: 1, depth: 28, Ro: 0.83, Rw: 37, Lt: 70, Lr: 18, Ra: 95, Det: 41, Er: 21, Ea: 38, Sf: 49, Sc: 0.56, S: 1.43, weight: 41, secure: "P2A", name: "4-20Ar-4Эл", _type: { multi: true, },
    },
    {
        cams: 1, depth: 28, Ro: 1.00, Rw: 36, Lt: 70, Lr: 18, Ra: 96, Det: 42, Er: 22, Ea: 36, Sf: 50, Sc: 0.57, S: 1.4, weight: 37, secure: "P2A", name: "4TopN-20Ar-4(FHcl)", _type: { solarproof: true, energy: true },
    },
    {
        cams: 1, depth: 28, Ro: 0.91, Rw: 36, Lt: 70, Lr: 18, Ra: 96, Det: 42, Er: 22, Ea: 36, Sf: 50, Sc: 0.57, S: 1.4, weight: 37, secure: "P2A", name: "4-20Ar-4Сбр", _type: { solarproof: true },
    },
    {
        cams: 1, depth: 28, Ro: 1.67, Rw: 33, Lt: 69, Lr: 18, Ra: 96, Det: 40, Er: 33, Ea: 12, Sf: 51, Sc: 0.59, S: 1.35, weight: 30, secure: "none", name: "4TopN-20-4", _type: { simple: true },
    },
    {
        cams: 1, depth: 28, Ro: 1.43, Rw: 33, Lt: 69, Lr: 18, Ra: 96, Det: 40, Er: 35, Ea: 25, Sf: 51, Sc: 0.59, S: 1.35, weight: 30, secure: "none", name: "4-20-4", _type: { simple: true },
    },
    {
        cams: 2, depth: 36, Ro: 0.56, Rw: 33, Lt: 51, Lr: 12, Ra: 96, Det: 47, Er: 11, Ea: 42, Sf: 53, Sc: 0.61, S: 0.96, weight: 30, secure: "none", name: "3.3.1-10-4-12Ar-4Эл", _type: { hitproof: true, soundproof: true, multi: true },
    },
    {
        cams: 2, depth: 36, Ro: 0.71, Rw: 35, Lt: 76, Lr: 12, Ra: 96, Det: 45, Er: 20, Ea: 35, Sf: 53, Sc: 0.61, S: 1.43, weight: 36, secure: "P2A", name: "6-10-4-12Ar-4Эл", _type: { multi: true, soundproof: true },
    },
    {
        cams: 2, depth: 36, Ro: 0.77, Rw: 36, Lt: 77, Lr: 12, Ra: 96, Det: 46, Er: 20, Ea: 34, Sf: 54, Sc: 0.62, S: 1.43, weight: 31, secure: "P2A", name: "4-12-4-12Ar-4Эл", _type: { multi: true },
    },
    {
        cams: 2, depth: 36, Ro: 0.91, Rw: 35, Lt: 78, Lr: 13, Ra: 97, Det: 48, Er: 22, Ea: 30, Sf: 55, Sc: 0.63, S: 1.42, weight: 27, secure: "P2A", name: "4TopN-12Ar-4-12-4(FHcl)", _type: { solarproof: true, energy: true },
    },
    {
        cams: 2, depth: 36, Ro: 1.00, Rw: 36, Lt: 71, Lr: 18, Ra: 97, Det: 47, Er: 29, Ea: 24, Sf: 56, Sc: 0.64, S: 1.27, weight: 35, secure: "none", name: "6TopN-9Ar-4-9--4.4.1", _type: { hitproof: true, energy: true, soundproof: true },
    },
    {
        cams: 2, depth: 36, Ro: 1.11, Rw: 33, Lt: 72, Lr: 19, Ra: 97, Det: 48, Er: 31, Ea: 21, Sf: 57, Sc: 0.66, S: 1.26, weight: 30, secure: "none", name: "4TopN-10Ar-4-10-4.4.1", _type: { hitproof: true, energy: true, soundproof: true },
    },
    {
        cams: 2, depth: 36, Ro: 0.38, Rw: 31, Lt: 56, Lr: 9, Ra: 96, Det: 52, Er: 9, Ea: 39, Sf: 59, Sc: 0.68, S: 0.95, weight: 20, secure: "none", name: "4TopN-10ARr-4-12-3.3.1", _type: { hitproof: true, energy: true, soundproof: true },
    },
    {
        cams: 2, depth: 36, Ro: 0.38, Rw: 30, Lt: 56, Lr: 9, Ra: 96, Det: 52, Er: 9, Ea: 39, Sf: 59, Sc: 0.68, S: 0.95, weight: 20, secure: "none", name: "4TopN-12Ar-4TopN-12Ar-4", _type: { energy: true },
    },
    {
        cams: 2, depth: 36, Ro: 0.50, Rw: 39, Lt: 71, Lr: 19, Ra: 95, Det: 52, Er: 14, Ea: 34, Sf: 60, Sc: 0.69, S: 1.18, weight: 46, secure: "P2A", name: "4-12-4-12Ar-4Сбр", _type: { solarproof: true },
    },
    {
        cams: 2, depth: 36, Ro: 0.53, Rw: 37, Lt: 72, Lr: 19, Ra: 96, Det: 53, Er: 14, Ea: 33, Sf: 60, Sc: 0.69, S: 1.2, weight: 41, secure: "P2A", name: "6-9-4-9-4.4.1", _type: { hitproof: true, soundproof: true },
    },
    {
        cams: 2, depth: 36, Ro: 0.50, Rw: 37, Lt: 72, Lr: 19, Ra: 96, Det: 53, Er: 14, Ea: 33, Sf: 60, Sc: 0.69, S: 1.2, weight: 41, secure: "P2A", name: "4-10-4-10-4.4.1", _type: { hitproof: true, soundproof: true },
    },
    {
        cams: 2, depth: 36, Ro: 0.71, Rw: 31, Lt: 79, Lr: 13, Ra: 98, Det: 53, Er: 30, Ea: 17, Sf: 61, Sc: 0.7, S: 1.3, weight: 20, secure: "none", name: "4-10-4-12-3.3.1", _type: { hitproof: true, soundproof: true },
    },
    {
        cams: 1, depth: 40, Ro: 0.71, Rw: 30, Lt: 79, Lr: 13, Ra: 98, Det: 53, Er: 30, Ea: 17, Sf: 61, Sc: 0.7, S: 1.3, weight: 20, secure: "none", name: "4.4.1-24-4.4.1", _type: { hitproof: true, soundproof: true },
    },
    {
        cams: 2, depth: 40, Ro: 0.56, Rw: 36, Lt: 73, Lr: 20, Ra: 96, Det: 55, Er: 15, Ea: 30, Sf: 62, Sc: 0.71, S: 1.18, weight: 37, secure: "P2A", name: "4-12-4-16Ar-4Эл", _type: { multi: true },
    },
    {
        cams: 2, depth: 40, Ro: 0.53, Rw: 36, Lt: 73, Lr: 20, Ra: 96, Det: 55, Er: 15, Ea: 30, Sf: 62, Sc: 0.71, S: 1.18, weight: 37, secure: "P2A", name: "4-14-4-14Ar-4Эл", _type: { multi: true },
    },
    {
        cams: 2, depth: 40, Ro: 0.38, Rw: 41, Lt: 78, Lr: 14, Ra: 96, Det: 56, Er: 11, Ea: 33, Sf: 66, Sc: 0.76, S: 1.18, weight: 42, secure: "P2A", name: "4-14-4-14-4Эл", _type: { multi: true },
    },
    {
        cams: 2, depth: 40, Ro: 0.36, Rw: 36, Lt: 79, Lr: 14, Ra: 97, Det: 62, Er: 11, Ea: 27, Sf: 67, Sc: 0.77, S: 1.18, weight: 31, secure: "P2A", name: "4TopN-12Ar-4-12-4.4.1", _type: { hitproof: true, soundproof: true, energy: true },
    },
    {
        cams: 2, depth: 40, Ro: 0.34, Rw: 35, Lt: 78, Lr: 14, Ra: 96, Det: 59, Er: 11, Ea: 30, Sf: 67, Sc: 0.77, S: 1.16, weight: 36, secure: "P2A", name: "4TopN-12Ar-4-14-3.3.1", _type: { hitproof: true, soundproof: true, energy: true },
    },
    {
        cams: 2, depth: 40, Ro: 0.37, Rw: 35, Lt: 80, Lr: 14, Ra: 97, Det: 64, Er: 12, Ea: 24, Sf: 69, Sc: 0.79, S: 1.16, weight: 27, secure: "P2A", name: "4TopN-14Ar-4TopN-14Ar-4", _type: { energy: true },
    },
    {
        cams: 2, depth: 40, Ro: 0.43, Rw: 33, Lt: 75, Lr: 20, Ra: 98, Det: 68, Er: 18, Ea: 14, Sf: 72, Sc: 0.83, S: 1.04, weight: 30, secure: "none", name: "4TopN-12Ar-4-14-6", _type: { energy: true, soundproof: true },
    },
    {
        cams: 2, depth: 40, Ro: 0.56, Rw: 33, Lt: 75, Lr: 20, Ra: 98, Det: 68, Er: 18, Ea: 14, Sf: 73, Sc: 0.84, S: 1.03, weight: 30, secure: "none", name: "4TopN-14Ar-4-14-4", _type: { energy: true },
    },
    {
        cams: 2, depth: 40, Ro: 0.36, Rw: 36, Lt: 81, Lr: 15, Ra: 99, Det: 74, Er: 13, Ea: 13, Sf: 78, Sc: 0.9, S: 1.04, weight: 25, secure: "none", name: "4-12-4-12-4.4.1", _type: { hitproof: true, soundproof: true },
    },
    {
        cams: 2, depth: 40, Ro: 0.37, Rw: 31, Lt: 82, Lr: 15, Ra: 99, Det: 76, Er: 14, Ea: 10, Sf: 80, Sc: 0.92, S: 1.03, weight: 20, secure: "none", name: "4-12-4-12-3.3.1", _type: { hitproof: true, soundproof: true },
    },
    {
        cams: 2, depth: 40, Ro: 0.37, Rw: 30, Lt: 82, Lr: 15, Ra: 99, Det: 76, Er: 14, Ea: 10, Sf: 80, Sc: 0.92, S: 1.03, weight: 20, secure: "none", name: "4-14-4-14-4", _type: { simple: true },
    },

]


export const depths = [
    { name: "3.3.1-14Ar-4Эл", depth: 24, Ro: 1.00 },
    { name: "4-16Ar-4Эл", depth: 24, Ro: 1.00 },
    { name: "4TopN-14Ar-6(FHcl)", depth: 24, Ro: 1.25 },
    { name: "4TopN-16Ar-4(FHcl)", depth: 24, Ro: 1.11 },
    { name: "6TopN-10Ar-4.4.1", depth: 24, Ro: 1.00 },
    { name: "4TopN-12Ar-4.4.1", depth: 24, Ro: 0.91 },
    { name: "4TopN-14Ar-3.3.1", depth: 24, Ro: 0.91 },
    { name: "4-16Ar-4Сбр", depth: 24, Ro: 1.00 },
    { name: "4TopN-16-4", depth: 24, Ro: 1.00 },
    { name: "4-12-4.4.1", depth: 24, Ro: 0.91 },
    { name: "6-10-4.4.1", depth: 24, Ro: 1.00 },
    { name: "4-14-3.3.1", depth: 24, Ro: 0.91 },
    { name: "4-14-6", depth: 24, Ro: 0.91 },
    { name: "4-16-4", depth: 24, Ro: 0.91 },
    { name: "4-6-4-6-4", depth: 24, Ro: 0.83 },
    { name: "6-14Ar-4Эл", depth: 26, Ro: 1.00 },
    { name: "4-20Ar-4Эл", depth: 28, Ro: 0.83 },
    { name: "4TopN-20Ar-4(FHcl)", depth: 28, Ro: 1.00 },
    { name: "4-20Ar-4Сбр", depth: 28, Ro: 0.91 },
    { name: "4TopN-20-4", depth: 28, Ro: 1.67 },
    { name: "4-20-4", depth: 28, Ro: 1.43 },
    { name: "3.3.1-10-4-12Ar-4Эл", depth: 36, Ro: 0.56 },
    { name: "6-10-4-12Ar-4Эл", depth: 36, Ro: 0.71 },
    { name: "4-12-4-12Ar-4Эл", depth: 36, Ro: 0.77 },
    { name: "4TopN-12Ar-4-12-4(FHcl)", depth: 36, Ro: 0.91 },
    { name: "6TopN-9Ar-4-9--4.4.1", depth: 36, Ro: 1.00 },
    { name: "4TopN-10Ar-4-10-4.4.1", depth: 36, Ro: 1.11 },
    { name: "4TopN-10ARr-4-12-3.3.1", depth: 36, Ro: 0.38 },
    { name: "4TopN-12Ar-4TopN-12Ar-4", depth: 36, Ro: 0.38 },
    { name: "4-12-4-12Ar-4Сбр", depth: 36, Ro: 0.50 },
    { name: "6-9-4-9-4.4.1", depth: 36, Ro: 0.53 },
    { name: "4-10-4-10-4.4.1", depth: 36, Ro: 0.50 },
    { name: "4-10-4-12-3.3.1", depth: 36, Ro: 0.71 },
    { name: "4.4.1-24-4.4.1", depth: 40, Ro: 0.71 },
    { name: "4-12-4-16Ar-4Эл", depth: 40, Ro: 0.56 },
    { name: "4-14-4-14Ar-4Эл", depth: 40, Ro: 0.53 },
    { name: "4-14-4-14-4Эл", depth: 40, Ro: 0.38 },
    { name: "4TopN-12Ar-4-12-4.4.1", depth: 40, Ro: 0.36 },
    { name: "4TopN-12Ar-4-14-3.3.1", depth: 40, Ro: 0.34 },
    { name: "4TopN-14Ar-4TopN-14Ar-4", depth: 40, Ro: 0.37 },
    { name: "4TopN-12Ar-4-14-6", depth: 40, Ro: 0.43 },
    { name: "4TopN-14Ar-4-14-4", depth: 40, Ro: 0.56 },
    { name: "4-12-4-12-4.4.1", depth: 40, Ro: 0.36 },
    { name: "4-12-4-12-3.3.1", depth: 40, Ro: 0.37 },
    { name: "4-14-4-14-4", depth: 40, Ro: 0.37 },

]






type tt = {
    name: string, _type: StpTypeProps
}


export const stpNames: tt[] = [
    { name: "3.3.1-14Ar-4Эл", _type: { hitproof: true, soundproof: true, multi: true } },
    { name: "4-16Ar-4Эл", _type: { multi: true } },
    { name: "4TopN-14Ar-6(FHcl)", _type: { soundproof: true, solarproof: true, energy: true } },
    { name: "4TopN-16Ar-4(FHcl)", _type: { solarproof: true, energy: true } },
    { name: "6TopN-10Ar-4.4.1", _type: { hitproof: true, soundproof: true, energy: true } },
    { name: "4TopN-12Ar-4.4.1", _type: { hitproof: true, soundproof: true, energy: true } },
    { name: "4TopN-14Ar-3.3.1", _type: { hitproof: true, soundproof: true, energy: true } },
    { name: "4-16Ar-4Сбр", _type: { solarproof: true } },
    { name: "4TopN-16-4", _type: { simple: true } },
    { name: "4-12-4.4.1", _type: { hitproof: true, soundproof: true } },
    { name: "6-10-4.4.1", _type: { hitproof: true, soundproof: true } },
    { name: "4-14-3.3.1", _type: { hitproof: true, soundproof: true } },
    { name: "4-14-6", _type: { soundproof: true } },
    { name: "4-16-4", _type: { simple: true } },
    { name: "4-6-4-6-4", _type: { simple: true } },
    { name: "6-14Ar-4Эл", _type: { multi: true, soundproof: true } },
    { name: "4-20Ar-4Эл", _type: { multi: true, } },
    { name: "4TopN-20Ar-4(FHcl)", _type: { solarproof: true, energy: true } },
    { name: "4-20Ar-4Сбр", _type: { solarproof: true } },
    { name: "4TopN-20-4", _type: { simple: true } },
    { name: "4-20-4", _type: { simple: true } },
    { name: "3.3.1-10-4-12Ar-4Эл", _type: { hitproof: true, soundproof: true, multi: true } },
    { name: "6-10-4-12Ar-4Эл", _type: { multi: true, soundproof: true } },
    { name: "4-12-4-12Ar-4Эл", _type: { multi: true } },
    { name: "4TopN-12Ar-4-12-4(FHcl)", _type: { solarproof: true, energy: true } },
    { name: "6TopN-9Ar-4-9--4.4.1", _type: { hitproof: true, energy: true, soundproof: true } },
    { name: "4TopN-10Ar-4-10-4.4.1", _type: { hitproof: true, energy: true, soundproof: true } },
    { name: "4TopN-10ARr-4-12-3.3.1", _type: { hitproof: true, energy: true, soundproof: true } },
    { name: "4TopN-12Ar-4TopN-12Ar-4", _type: { energy: true } },
    { name: "4-12-4-12Ar-4Сбр", _type: { solarproof: true } },
    { name: "6-9-4-9-4.4.1", _type: { hitproof: true, soundproof: true } },
    { name: "4-10-4-10-4.4.1", _type: { hitproof: true, soundproof: true } },
    { name: "4-10-4-12-3.3.1", _type: { hitproof: true, soundproof: true } },
    { name: "4.4.1-24-4.4.1", _type: { hitproof: true, soundproof: true } },
    { name: "4-12-4-16Ar-4Эл", _type: { multi: true } },
    { name: "4-14-4-14Ar-4Эл", _type: { multi: true } },
    { name: "4-14-4-14-4Эл", _type: { multi: true } },
    { name: "4TopN-12Ar-4-12-4.4.1", _type: { hitproof: true, soundproof: true, energy: true } },
    { name: "4TopN-12Ar-4-14-3.3.1", _type: { hitproof: true, soundproof: true, energy: true } },
    { name: "4TopN-14Ar-4TopN-14Ar-4", _type: { energy: true } },
    { name: "4TopN-12Ar-4-14-6", _type: { energy: true, soundproof: true } },
    { name: "4TopN-14Ar-4-14-4", _type: { energy: true } },
    { name: "4-12-4-12-4.4.1", _type: { hitproof: true, soundproof: true } },
    { name: "4-12-4-12-3.3.1", _type: { hitproof: true, soundproof: true } },
    { name: "4-14-4-14-4", _type: { simple: true } },

]




































