import { StpItem } from "./TableObjects"

type TerminsDesc = { [Key in keyof StpItem]?: string }

// const TerminDescription: TerminsDesc = {
//     Ro: 'Ro - коэффециент сопротивления теплопередачи - сколько тепла сохраняет стекло (чем больше значение ,тем теплее)',
//     Rw: 'Rw - звукоизоляция - сколько звука отражает стекло (чем больше значение,тем тише)',
//     Lt: 'Lt - светопропускание - сколько света проходит через стекло (чем больше значение, тем прозрачнее)',
//     Lr: 'Lr - светоотражение - сколько света отражается от стекла (чем больше значение, тем лучше видно отражение)',
//     Ra: 'Ra - уровень приемлемой цветопередачи - на сколько искажаются  цвета через стекло (чем больше значение,  тем меньше через стекло искажения цвета предметов)',
//     Det: 'Det - прямое пропускание энергии солнечного излучения - сколько проходит солнечного излучения через стекло (чем меньше значение, тем меньше света пройдет через стекло)',
//     Er: 'Er - отражение солнечной энергии - сколько солнечной энергии отражает стекло (чем больше значение, тем лучше отражение)',
//     Ea: 'Ea - поглощение солнечной энергии -сколько солнечной энергии поглощает стекло (чем больше значение,тем меньше стекло нагревается) ',
//     Sf: 'Sf - коэффициент общего пропускания солнечной энергии -сколько солнечной энергии проходит через стекло (чем ниже значение, тем лучше стекло защищает от перегрева)',
//     // Sc: 'Sc - коэффециент затемнения - сколько прямых солнечных лучей попадает через стекло (чем меньше значение, тем больше стекло теплоизолирует(затеняет) интерьер)',
//     S: 'S - Соотношение многофункциональности стеклопакета(селективность)-сколько света и солнца пропускает стекло (чем больше значение, тем  лучше защита от солнца и попадание света)',
//     secure: 'Класс безопасности - P2A - Защита от удара тяжелого (металлического) тупого предмета, не разлетится на куски.',
//     name: 'Формула стеклопакета читается слева направо - помещение->улица',
//     cams: 'Кол-во камер - 1 камера - 2 стекла, 2 камеры - 3 стекла',
//     depth: "Толщина - толщина стеклопакета в мм",
//     weight: "Вес - вес одного квадратного метра стеклопакета",
// }
export const _TerminsDesc = {
    Ro: 'Чем больше значение, тем теплее',
    Rw: 'Чем больше значение, тем тише',
    Lt: 'Доля видимого света, проходящего через стекло - чем больше значение, тем светлее в помещении',
    Lr: 'Способность стекла отражать видимы свет. Процент отраженного от стекла света -  чем больше значение, тем меньше видно,то что внутри. Больше зеркальность',
    Ra: 'На сколько искажаются  цвета, проходя через стекло - чем выше - тем меньше искажение цвета',
    Det: 'Процент прохождения солнечного тепла через стекло. Чем меньше значение, тем меньше тепла пройдет через стекло',
    Er: 'Отражение тепла наружу. Доля солнечной энергии, отражаемой стеклом - чем больше значение, тем меньше нагревается помещение',
    Ea: 'Доля солнечного тепла, поглощенного стеклом - чем больше значение,тем больше стекло нагревается и не пускает тепло в помещение',
    Sf: 'Чем ниже значение, тем лучше стекло защищает помещение от перегрева',
    S: 'Отношение коэффициента пропускания видимого света и солнечного фактора. Чем выше, тем больше видимого света в помещении и оно меньше нагревается',
    secure: 'Р2А - Защита от ударов тяжелым тупым предметом, стекло не разлетится на куски.',
    name: 'TopN - Энергосберегающее напыление, Ar - Аргон, FHcl - Солнцезащитное, СБр / Эл - Мультифункциональное,  {4.4.1/3.3.1} - триплекс',
    cams: '1 камера - 2 стекла, 2 камеры - 3 стекла',
    depth: "Толщина стеклопакета в мм",
    weight: "Вес одного квадратного метра стеклопакета",
}

