export const enum StpPropFields {
    id = "id",
    formula = "Формула стеклопакета",
    stp_type = "Тип стеклопакета",

}

export enum _EnFieldsStp {
    cams = "Кол-во камер",
    depth = "Толщина",
    Ro = "Коэффециент сопротивления теплопередачи, Ro",
    // Ug = "Коэффециент теплопередачи стеклопакета, Ug",
    Rw = "Звукоизоляция, Rw",
    Lt = "Светопропускание, Lt",
    Lr = "Светоотражение, Lr",
    Ra = "Уровень приемлемой цветопередачи, Ra",
    Det = "Прямое пропускание энергии солнечного излучения, Det",
    Er = "Отражение солнечной энергии, Er",
    Ea = "Поглощение солнечной энергии, Ea",
    Sf = "Коэффициент общего пропускания солнечной энергии, Sf",
    // Sc = "Коэффициент затемнения, Sc",
    S = "Соотношение многофункциональности стеклопакета (селективность), S",
    weight = "Вес 1 кв.м. стеклопакета",
    id = "id",
    name = "Формула стеклопакета",
    secure = 'Класс безопасности'
}

export enum Stp_TypeFields {
    simple = "Простой",
    multi = "Мультифункциональный",
    triplex = "Триплекс",
    soundproof = "Шумоизоляционный",
    hitproof = "Противоударный",
    solarproof = "Солнцеотражающий",
}
export enum Stp_Tags {
    multi = "МультиФункциональный",
    simple = "Простой",
    energy = "Теплый",
    soundproof = "Шумоизоляционный",
    hitproof = "Безопасный",
    solarproof = "Солнцеотражающий",
    standart = "Стандартный"
}

export type Stp_Key = keyof typeof _EnFieldsStp