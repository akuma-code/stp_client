
export type StpTags =
    | "multi"
    | "simple"
    | "energy"
    | "soundproof"
    | "hitproof"
    | "solarproof"
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
    // Sc?: number
    S: number
    weight: number
    secure: "P2A" | "нет" | "CM2" | "CM3"
    name: string
    tags: StpTags[]
}

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








const stpNames = [
    { name: "3.3.1-14Ar-4Эл", tags: ['hitproof', 'soundproof', 'multi'] },
    { name: "4-16Ar-4Эл", tags: ['multi'] },
    { name: "4TopN-14Ar-6(FHcl)", tags: ['soundproof', 'solarproof', 'energy'] },
    { name: "4TopN-16Ar-4(FHcl)", tags: ['solarproof', 'energy'] },
    { name: "6TopN-10Ar-4.4.1", tags: ['hitproof', 'soundproof', 'energy'] },
    { name: "4TopN-12Ar-4.4.1", tags: ['hitproof', 'soundproof', 'energy'] },
    { name: "4TopN-14Ar-3.3.1", tags: ['hitproof', 'soundproof', 'energy'] },
    { name: "4-16Ar-4Сбр", tags: ['solarproof'] },
    { name: "4TopN-16-4", tags: ['simple'] },
    { name: "4-12-4.4.1", tags: ['hitproof', 'soundproof'] },
    { name: "6-10-4.4.1", tags: ['hitproof', 'soundproof'] },
    { name: "4-14-3.3.1", tags: ['hitproof', 'soundproof'] },
    { name: "4-14-6", tags: ['soundproof'] },
    { name: "4-16-4", tags: ['simple'] },
    { name: "4-6-4-6-4", tags: ['simple'] },
    { name: "6-14Ar-4Эл", tags: ['multi', 'soundproof'] },
    { name: "4-20Ar-4Эл", tags: ['multi',] },
    { name: "4TopN-20Ar-4(FHcl)", tags: ['solarproof', 'energy'] },
    { name: "4-20Ar-4Сбр", tags: ['solarproof'] },
    { name: "4TopN-20-4", tags: ['simple'] },
    { name: "4-20-4", tags: ['simple'] },
    { name: "3.3.1-10-4-12Ar-4Эл", tags: ['hitproof', 'soundproof', 'multi'] },
    { name: "6-10-4-12Ar-4Эл", tags: ['multi', 'soundproof'] },
    { name: "4-12-4-12Ar-4Эл", tags: ['multi'] },
    { name: "4TopN-12Ar-4-12-4(FHcl)", tags: ['solarproof', 'energy'] },
    { name: "6TopN-9Ar-4-9--4.4.1", tags: ['hitproof', 'energy', 'soundproof'] },
    { name: "4TopN-10Ar-4-10-4.4.1", tags: ['hitproof', 'energy', 'soundproof'] },
    { name: "4TopN-10ARr-4-12-3.3.1", tags: ['hitproof', 'energy', 'soundproof'] },
    { name: "4TopN-12Ar-4TopN-12Ar-4", tags: ['energy'] },
    { name: "4-12-4-12Ar-4Сбр", tags: ['solarproof'] },
    { name: "6-9-4-9-4.4.1", tags: ['hitproof', 'soundproof'] },
    { name: "4-10-4-10-4.4.1", tags: ['hitproof', 'soundproof'] },
    { name: "4-10-4-12-3.3.1", tags: ['hitproof', 'soundproof'] },
    { name: "4.4.1-24-4.4.1", tags: ['hitproof', 'soundproof'] },
    { name: "4-12-4-16Ar-4Эл", tags: ['multi'] },
    { name: "4-14-4-14Ar-4Эл", tags: ['multi'] },
    { name: "4-14-4-14-4Эл", tags: ['multi'] },
    { name: "4TopN-12Ar-4-12-4.4.1", tags: ['hitproof', 'soundproof', 'energy'] },
    { name: "4TopN-12Ar-4-14-3.3.1", tags: ['hitproof', 'soundproof', 'energy'] },
    { name: "4TopN-14Ar-4TopN-14Ar-4", tags: ['energy'] },
    { name: "4TopN-12Ar-4-14-6", tags: ['energy', 'soundproof'] },
    { name: "4TopN-14Ar-4-14-4", tags: ['energy'] },
    { name: "4-12-4-12-4.4.1", tags: ['hitproof', 'soundproof'] },
    { name: "4-12-4-12-3.3.1", tags: ['hitproof', 'soundproof'] },
    { name: "4-14-4-14-4", tags: ['simple'] },

]

// stpNames.map(stp => {
//     StpItems.map(s => s.name === stp.name ? { ...s, tags: stp.tags } : s)

// }
// )


































