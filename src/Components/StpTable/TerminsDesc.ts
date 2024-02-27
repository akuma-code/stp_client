import { StpItem } from "./TableObjects"

type TerminsDesc = { [Key in keyof StpItem]?: string }

export const TerminDescription: TerminsDesc = {
    Ro: 'Ro - коэффециент сопротивления теплопередачи - сколько тепла сохраняет стекло (чем больше значение ,тем теплее)',
    Rw: 'Rw - звукоизоляция - сколько звука отражает стекло (чем больше значение,тем тише)',
    Lt: 'Lt - светопропускание - сколько света проходит через стекло (чем больше значение, тем прозрачнее)',
    Lr: 'Lr - светоотражение - сколько света отражается от стекла (чем больше значение, тем лучше видно отражение)',
    Ra: 'Ra - уровень приемлемой цветопередачи - на сколько искажаются  цвета через стекло (чем больше значение,  тем меньше через стекло искажения цвета предметов)',
    Det: 'Det - прямое пропускание энергии солнечного излучения - сколько проходит солнечного излучения через стекло (чем меньше значение, тем меньше света пройдет через стекло)',
    Er: 'Er - отражение солнечной энергии - сколько солнечной энергии отражает стекло (чем больше значение, тем лучше отражение)',
    Ea: 'Ea - поглощение солнечной энергии -сколько солнечной энергии поглощает стекло (чем больше значение,тем меньше стекло нагревается) ',
    Sf: 'Sf - коэффициент общего пропускания солнечной энергии -сколько солнечной энергии проходит через стекло (чем ниже значение, тем лучше стекло защищает от перегрева)',
    Sc: 'Sc - коэффециент затемнения - сколько прямых солнечных лучей попадает через стекло (чем меньше значение, тем больше стекло теплоизолирует(затеняет) интерьер)',
    S: 'S - Соотношение многофункциональности стеклопакета(селективность)-сколько света и солнца пропускает стекло (чем больше значение, тем  лучше защита от солнца и попадание света)',
    secure: 'Класс безопасности - P2A - Защита от удара тяжелого (металлического) тупого предмета, не разлетится на куски.',
    name: 'Формула стеклопакета читается слева направо - помещение->улица',
    cams: 'Кол-во камер - 1 камера - 2 стекла, 2 камеры - 3 стекла',
    depth: "Толщина - толщина стеклопакета в мм",
    weight: "Вес - вес одного квадратного метра стеклопакета",
}
export const SecondaryDescription: TerminsDesc = {
    Ro: 'Чем больше значение, тем теплее',
    Rw: 'Чем больше значение, тем тише',
    Lt: 'Доля света, проходящего через стекло - чем больше значение, тем светлее',
    Lr: 'Процент отраженного от стекла света -  чем больше значение, тем меньше видно, что внутри',
    Ra: 'На сколько искажаются  цвета, проходя через стекло',
    Det: 'Процент прохождения солнечного излучения через стекло - чем меньше значение, тем меньше света пройдет через стекло',
    Er: 'Доля солнечной энергии, отражаемой стеклом - чем больше значение, тем меньше нагревается помещение',
    Ea: 'Доля солнечной энергии, поглощенной стеклом - чем больше значение,тем меньше стекло нагревается ',
    Sf: 'Доля солнечной энергии, пропускаемой стеклом - чем ниже значение, тем лучше стекло защищает от перегрева',
    Sc: 'Процент солнечных лучей, проходящих через стекло - чем меньше значение, тем меньше темнее в помещении',
    S: 'Отношение коэффициента пропускания видимиого света и солнечного фактора. Чем выше селективность, тем больше видимого света пропускает солнцезащитное стекло.',
    secure: 'Р2А - Защита от ударов тяжелым тупым предметом, стекло не разлетится на куски.',
    name: 'Слева направо: помещение -> улица',
    cams: '1 камера - 2 стекла, 2 камеры - 3 стекла',
    depth: "Толщина стеклопакета в мм",
    weight: "Вес одного квадратного метра стеклопакета",
}

