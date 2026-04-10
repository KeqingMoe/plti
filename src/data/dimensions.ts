import type { DimensionDefinition } from '../lib/types.ts';

export const dimensions: DimensionDefinition[] = [
  {
    id: 'type-discipline',
    name: '类型纪律',
    shortName: '类型',
    leftTitle: '先写再跑',
    rightTitle: '先约束再兑现',
    summary: '你更愿意在编译前把问题圈住，还是接受运行时的弹性和自由。',
    leftDescription: '你更倾向于边写边运行，通过迭代发现和解决问题。',
    rightDescription: '你更倾向于先定义清晰的接口和类型，让编译器帮助发现潜在问题。',
    methodNote: '这一维同时观察你对静态约束、接口契约和长期维护成本的态度。'
  },
  {
    id: 'abstraction',
    name: '抽象胃口',
    shortName: '抽象',
    leftTitle: '直写流程',
    rightTitle: '提炼模式',
    summary: '你更偏向把流程摊开写明白，还是主动把重复结构抽成组合。',
    leftDescription: '你更喜欢直观的数据流和控制流，一眼就能理解程序执行路径。',
    rightDescription: '你愿意投入学习成本来获得更强的组合性和抽象能力，用函数、类型等压缩复杂度。',
    methodNote: '这一维结合了 PLT 中的组合子思维，也考虑工程里对抽象层数的忍耐度。'
  },
  {
    id: 'effects',
    name: '效应观',
    shortName: '效应',
    leftTitle: '副作用直给',
    rightTitle: '可推理纯度',
    summary: '你更在意把事做成，还是更在意代码行为能被稳定推理和复用。',
    leftDescription: '你更接受状态、I/O 和隐式变化自然交织在一起的编程方式。',
    rightDescription: '你倾向于将副作用与纯函数逻辑分离，使代码行为更易于理解和推理。',
    methodNote: '这一维不是简单的“函数式崇拜”，而是在问你如何看待副作用、状态和推理成本。'
  },
  {
    id: 'control',
    name: '控制半径',
    shortName: '控制',
    leftTitle: '托管便利',
    rightTitle: '底层掌控',
    summary: '你是更愿意把运行时和工具链交给平台，还是希望自己掌握更多底层边界。',
    leftDescription: '你乐于把内存、线程和部署细节交给成熟平台，省下注意力去推进业务。',
    rightDescription: '你希望知道程序到底如何落到内存、调用约定和机器边界上，并保留亲手调度的空间。',
    methodNote: '这一维混合了系统编程取向、运行时信任度，以及你对“可控性”的需求。'
  },
  {
    id: 'engineering',
    name: '工程取向',
    shortName: '工程',
    leftTitle: '先交付',
    rightTitle: '先堵坑',
    summary: '你更愿意先把反馈循环跑起来，还是先把可靠性、防错和边界条件修平。',
    leftDescription: '你接受一些技术债和不完美，只要能尽快把产品推到真实环境里检验。',
    rightDescription: '你会主动为类型、测试、错误建模和性能留预算，因为后期返工更贵。',
    methodNote: '这一维更多反映工程哲学，不是“快就是草率”或“稳就是慢”，而是你的默认优先级。'
  },
  {
    id: 'exploration',
    name: '范式探索',
    shortName: '范式',
    leftTitle: '主流共识',
    rightTitle: '新范式实验',
    summary: '你更信任成熟生态和团队共识，还是更愿意为新思想和新模型多走几步。',
    leftDescription: '你喜欢招聘市场、文档、框架和社区都足够大的语言，降低协作与维护摩擦。',
    rightDescription: '你愿意为了代数数据类型、Actor、类型推导或更干净的语义模型去试新路径。',
    methodNote: '这一维刻意保留一点 PL 气味，但不会把“探索”简单等同于“高冷小众”。'
  }
];

export const dimensionOrder = dimensions.map((dimension) => dimension.id);

