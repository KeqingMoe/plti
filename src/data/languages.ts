import type { LanguageProfile } from '../lib/types.ts';

export const languages: LanguageProfile[] = [
  {
    id: 'python',
    name: 'Python',
    personaTitle: '速写派脚本师',
    group: 'industrial',
    vector: {
      'type-discipline': -2,
      abstraction: -1,
      effects: -2,
      control: -2,
      engineering: -1,
      exploration: -1
    },
    summary: '你倾向把编程当成流动的思考介质，先把问题说清、跑起来，再逐步补秩序。',
    whyFit: ['你重视表达速度。', '你愿意接受运行时弹性换取开发顺手。', '你对工具和生态的包容度高，先解决问题比先立法更重要。'],
    caveat: '当系统规模和约束密度上来后，你可能会开始怀念更强的边界感。',
    catchphrase: '先把脚本写出来，答案会自己浮上来。',
    blindspot: '容易低估大项目里隐式约定的长期成本。',
    idealTeam: '节奏快、实验多、能接受边做边澄清接口的团队。'
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    personaTitle: '事件流游侠',
    group: 'industrial',
    vector: {
      'type-discipline': -2,
      abstraction: 0,
      effects: -2,
      control: -2,
      engineering: -1,
      exploration: 0
    },
    summary: '你对交互、流动和现场反馈有天然亲和力，愿意在变化里找节奏，而不是先把一切冻住。',
    whyFit: ['你喜欢即时反馈。', '你能适应多范式混用。', '你对生态噪音有耐心，愿意在现实约束中做权衡。'],
    caveat: '如果团队缺少明确规范，你可能会被语言和工具链的宽容反过来消耗。',
    catchphrase: '先把页面点亮，边界我们稍后再补。',
    blindspot: '容易把“灵活”误当成“没有抽象债”。',
    idealTeam: '重视产品反馈、前后端协作紧密、对快速试错友好的团队。'
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    personaTitle: '契约补缀师',
    group: 'industrial',
    vector: {
      'type-discipline': 1,
      abstraction: 0,
      effects: -1,
      control: -1,
      engineering: 0,
      exploration: -1
    },
    summary: '你并不想推翻现实世界的脚手架，但你确实想把它们缝得更牢。',
    whyFit: ['你重视类型，但也接受现实兼容。', '你喜欢在动态生态里逐步增加秩序。', '你看重团队协作中的接口可见性。'],
    caveat: '当底层语义和上层约束长期错位时，你会反复在“够用”与“彻底”之间摇摆。',
    catchphrase: '不求绝对纯净，但求调用点别再猜。',
    blindspot: '可能高估类型注解对真实运行时复杂度的覆盖能力。',
    idealTeam: '已有大规模 JS 资产、但开始认真对待可维护性的团队。'
  },
  {
    id: 'go',
    name: 'Go',
    personaTitle: '管道工程师',
    group: 'industrial',
    vector: {
      'type-discipline': 1,
      abstraction: -2,
      effects: -2,
      control: 1,
      engineering: 0,
      exploration: -2
    },
    summary: '你偏爱清晰、直接、能大规模复制的工程手感，不喜欢把语言本身变成智力竞赛。',
    whyFit: ['你信任简单惯例。', '你希望代码结构对全队都一目了然。', '你愿意压低抽象换取部署和协作的平整度。'],
    caveat: '在复杂领域建模或高表达力需求面前，你可能会觉得工具箱不够锋利。',
    catchphrase: '把接口磨平，比把作者显得聪明更重要。',
    blindspot: '有时会把“简单”推进成“过度克制”。',
    idealTeam: '服务端基础设施、平台工程、强调统一编码风格的团队。'
  },
  {
    id: 'java',
    name: 'Java',
    personaTitle: '平台建筑师',
    group: 'industrial',
    vector: {
      'type-discipline': 2,
      abstraction: -1,
      effects: -2,
      control: -1,
      engineering: 1,
      exploration: -2
    },
    summary: '你对规模化系统和长期演进有敬畏，宁愿在前期多写一点秩序，也不想后期靠勇气撑住。',
    whyFit: ['你认可显式结构。', '你重视平台稳定性和生态成熟度。', '你更愿意在规范中做工程，而不是重新发明环境。'],
    caveat: '如果问题本身更轻更快，你可能会给它套上过重的制服。',
    catchphrase: '系统迟早会长大，不如一开始就给它留楼梯。',
    blindspot: '容易把组织复杂度和语言复杂度绑定得过深。',
    idealTeam: '重平台、重中台、重稳定 SLA 的大规模业务团队。'
  },
  {
    id: 'csharp',
    name: 'C#',
    personaTitle: '工具链统筹者',
    group: 'industrial',
    vector: {
      'type-discipline': 2,
      abstraction: 0,
      effects: -1,
      control: -1,
      engineering: 1,
      exploration: -1
    },
    summary: '你想要强大的工程工具、清楚的语言边界和不错的人体工学，而不是在原教旨与妥协之间二选一。',
    whyFit: ['你欣赏成熟 IDE 和工具链。', '你希望语言既有秩序也有现代语法糖。', '你重视团队交付效率而不只盯语言纯度。'],
    caveat: '你可能会把生态提供的顺手感误解成“所有领域都同样合适”。',
    catchphrase: '该工程化的地方，就让工具链狠狠干活。',
    blindspot: '容易把平台舒适圈当成技术判断本身。',
    idealTeam: '重视开发体验、平台规范和迭代速度的产品型团队。'
  },
  {
    id: 'kotlin',
    name: 'Kotlin',
    personaTitle: '安全派实用主义者',
    group: 'industrial',
    vector: {
      'type-discipline': 2,
      abstraction: 1,
      effects: -1,
      control: -1,
      engineering: 1,
      exploration: -1
    },
    summary: '你既想要工业生态的稳，又不愿彻底放弃语言层面的优雅和表达力。',
    whyFit: ['你喜欢现代类型系统的保护感。', '你愿意为更好的 API 设计多花一点脑力。', '你偏爱在现实平台上做更舒服的工程。'],
    caveat: '当生态历史包袱太重时，你还是得和旧世界讲和。',
    catchphrase: '可以务实，但没必要写得像受罚。',
    blindspot: '有时会高估语法改良对架构问题的直接帮助。',
    idealTeam: '希望在成熟平台内逐步提升代码质量与表达力的团队。'
  },
  {
    id: 'swift',
    name: 'Swift',
    personaTitle: '体验锻造者',
    group: 'industrial',
    vector: {
      'type-discipline': 2,
      abstraction: 1,
      effects: -1,
      control: 0,
      engineering: 1,
      exploration: -1
    },
    summary: '你重视类型和可读性，但同样在意 API 的触感、产品体验和语言设计的审美。',
    whyFit: ['你喜欢把安全和可用性一起考虑。', '你愿意在现代语法与工业生态之间找平衡。', '你对“好语言也应该顺手”这件事格外敏感。'],
    caveat: '如果环境约束太强，你会对语言理想与平台现实的落差格外不耐烦。',
    catchphrase: '写给编译器看，也写给明天的自己看。',
    blindspot: '可能对体验细节投入太多，以至于忽略跨平台现实。',
    idealTeam: '产品体验驱动、同时愿意认真做 API 设计的团队。'
  },
  {
    id: 'c',
    name: 'C',
    personaTitle: '系统骨匠',
    group: 'industrial',
    vector: {
      'type-discipline': 1,
      abstraction: -2,
      effects: -2,
      control: 2,
      engineering: 0,
      exploration: -2
    },
    summary: '你相信很多事情只有足够贴近机器才算真正理解，语言最好别替你做太多主张。',
    whyFit: ['你重视可预期的底层行为。', '你不怕显式处理内存与边界。', '你更信任简单原语，而不是层层包装。'],
    caveat: '当系统复杂度来自建模和协作而非机器约束时，你可能会被手工成本拖住。',
    catchphrase: '先把骨架搭对，后面的肉才有地方长。',
    blindspot: '容易低估现代安全性和抽象工具的长期收益。',
    idealTeam: '嵌入式、基础运行时、性能和硬件贴身相关的团队。'
  },
  {
    id: 'cpp',
    name: 'C++',
    personaTitle: '零成本炼金师',
    group: 'industrial',
    vector: {
      'type-discipline': 1,
      abstraction: 1,
      effects: -2,
      control: 2,
      engineering: 1,
      exploration: 0
    },
    summary: '你既想触到机器边界，也不甘心停留在原始指令层，宁愿和复杂度狠狠干架。',
    whyFit: ['你重视性能和控制权。', '你认可“抽象不该默认付费”这套价值观。', '你能接受语言本身有历史沉积，只要它仍然够强。'],
    caveat: '语言和生态的自由度越高，就越需要团队自己建立纪律。',
    catchphrase: '如果抽象不能零成本，那它至少得值得。',
    blindspot: '可能高估团队平均水平对复杂工具链的承受能力。',
    idealTeam: '游戏引擎、基础设施、高性能系统和对资源极敏感的团队。'
  },
  {
    id: 'rust',
    name: 'Rust',
    personaTitle: '所有权守门人',
    group: 'industrial',
    vector: {
      'type-discipline': 2,
      abstraction: 1,
      effects: 0,
      control: 2,
      engineering: 2,
      exploration: 1
    },
    summary: '你追求的不是纯粹的底层自由，而是能把底层能力和强约束同时握在手里。',
    whyFit: ['你愿意为安全和正确性提前支付认知成本。', '你希望控制权不再默认与脆弱绑定。', '你偏爱语言级别的系统性保障。'],
    caveat: '当问题规模不大或团队尚未准备好时，前期摩擦可能会显得特别刺耳。',
    catchphrase: '能在编译期说清的事，就别留给线上事故。',
    blindspot: '有时会把严格约束带来的安心感推广到所有场景。',
    idealTeam: '在安全、性能和长期维护之间都不愿轻易让步的团队。'
  },
  {
    id: 'zig',
    name: 'Zig',
    personaTitle: '裸金属修整师',
    group: 'exploratory',
    vector: {
      'type-discipline': -1,
      abstraction: -2,
      effects: -2,
      control: 2,
      engineering: 1,
      exploration: 1
    },
    summary: '你对底层系统有强烈兴趣，但不想把复杂度继续继承给历史包袱。',
    whyFit: ['你重视显式控制。', '你偏爱更清爽的系统编程体验。', '你愿意尝试仍在成长中的语言，只要它的设计方向够清楚。'],
    caveat: '当生态成熟度变成第一约束时，你会发现理想路线还需要时间。',
    catchphrase: '系统语言也可以把废话删掉。',
    blindspot: '可能把语言设计上的清爽感过早等同于工程成熟度。',
    idealTeam: '愿意探索新一代系统语言，但又对可读性和工具简洁有要求的团队。'
  },
  {
    id: 'elixir',
    name: 'Elixir',
    personaTitle: '容错编排师',
    group: 'exploratory',
    vector: {
      'type-discipline': -1,
      abstraction: 1,
      effects: 1,
      control: -2,
      engineering: 0,
      exploration: 1
    },
    summary: '你更在乎系统在真实世界里如何持续活着，而不是每一行代码是否都像金属切面那样坚硬。',
    whyFit: ['你欣赏并发和容错模型。', '你能接受托管运行时换来系统弹性。', '你对声明式组织流程和消息驱动心态有好感。'],
    caveat: '在强静态建模或极致性能诉求下，你可能会觉得自己站在了错误战场。',
    catchphrase: '别只问程序会不会跑，也问它坏了以后怎么继续活。',
    blindspot: '容易低估生态边界之外需要亲自补的能力。',
    idealTeam: '高并发、强实时、重稳定性并乐于拥抱消息模型的团队。'
  },
  {
    id: 'scala',
    name: 'Scala',
    personaTitle: '混范式调和者',
    group: 'exploratory',
    vector: {
      'type-discipline': 2,
      abstraction: 2,
      effects: 0,
      control: -1,
      engineering: 1,
      exploration: 1
    },
    summary: '你不满足于“工业”或“理论”二选一，更想把范式的长处都拧到同一把扳手上。',
    whyFit: ['你对高阶抽象和类型系统有耐心。', '你希望高级建模能进入真实生产环境。', '你愿意处理复杂性，只要它确实带来表达力。'],
    caveat: '当团队共识不足时，强大的表达能力也会变成风格漂移的放大器。',
    catchphrase: '既然问题复杂，那语言也应该允许我认真复杂。',
    blindspot: '可能过于相信团队会自然共享你的抽象语境。',
    idealTeam: '数据平台、复杂业务建模或乐于深入类型设计的团队。'
  },
  {
    id: 'ocaml',
    name: 'OCaml',
    personaTitle: '类型工坊师',
    group: 'exploratory',
    vector: {
      'type-discipline': 2,
      abstraction: 1,
      effects: 1,
      control: 0,
      engineering: 2,
      exploration: 2
    },
    summary: '你重视建模质量，也重视语言给出的安静力量，希望代码既有理论骨架又不至于成为仪式表演。',
    whyFit: ['你喜欢代数数据类型与模式匹配。', '你欣赏类型推导和较低样板噪音。', '你对稳健抽象有兴趣，但不想把每件事都升格成教义。'],
    caveat: '在主流生态和招聘市场主导的环境里，你可能要为选择本身承担解释成本。',
    catchphrase: '把模型雕好，后面的实现就不必天天擦屁股。',
    blindspot: '可能低估与更大众生态协作时的沟通摩擦。',
    idealTeam: '重语言设计、编译工具、复杂建模或小而强的高密度工程团队。'
  },
  {
    id: 'haskell',
    name: 'Haskell',
    personaTitle: '纯度理论家',
    group: 'exploratory',
    vector: {
      'type-discipline': 2,
      abstraction: 2,
      effects: 2,
      control: 0,
      engineering: 2,
      exploration: 2
    },
    summary: '你不只是喜欢强抽象，你还希望抽象具有美感、可证明性和语义上的干净边界。',
    whyFit: ['你愿意为了纯度和可推理性付学费。', '你对类型系统和抽象结构有高度耐心。', '你喜欢把副作用显式隔离，而不是默认混在日常流程里。'],
    caveat: '如果团队目标更偏直接交付，你的语言偏好会显得过于昂贵。',
    catchphrase: '先把语义做干净，世界自然会变得更好说话。',
    blindspot: '容易低估团队成员对抽象门槛的真实承受度。',
    idealTeam: '研究型工程团队、语言工具链团队，或愿意把正确性当一等公民的环境。'
  }
];

