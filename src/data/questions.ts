import { dimensionOrder } from './dimensions.ts';
import type { DimensionId, Question, QuestionCategory } from '../lib/types.ts';

const bank: Record<DimensionId, Question[]> = {
  'type-discipline': [
    {
      id: 'td-01',
      dimension: 'type-discipline',
      prompt: '面对一个会持续演化的数据结构时，我更安心的起手式是：',
      leftLabel: '先用样例推动实现，等边界浮现再补约束',
      rightLabel: '先把字段和不变量定义清楚，再让实现跟上',
      polarity: 1,
      category: 'theory'
    },
    {
      id: 'td-02',
      dimension: 'type-discipline',
      prompt: '如果一个函数可能返回三四种失败形态，我更倾向于：',
      leftLabel: '先返回宽松结果，靠文档和调用方约定区分',
      rightLabel: '把失败形态编码进类型或显式结果结构',
      polarity: 1,
      category: 'engineering'
    },
    {
      id: 'td-03',
      dimension: 'type-discipline',
      prompt: '看到同事为了通过类型检查写了很多样板代码时，我通常会想：',
      leftLabel: '类型不该干扰直觉实现，先绕过去再说',
      rightLabel: '只要它换来可靠边界，这些显式成本值得',
      polarity: 1,
      category: 'team'
    },
    {
      id: 'td-04',
      dimension: 'type-discipline',
      prompt: '在原型阶段，我对“先不声明太多类型”的态度更接近：',
      leftLabel: '完全赞成，原型就该保留足够伸缩性',
      rightLabel: '谨慎赞成，至少核心结构还是该早点定型',
      polarity: 1,
      category: 'engineering'
    },
    {
      id: 'td-05',
      dimension: 'type-discipline',
      prompt: '当编译器不断要求我补齐分支、空值或模式时，我更常觉得：',
      leftLabel: '它在打断我完成真实任务',
      rightLabel: '它在替未来的事故提前收票',
      polarity: 1,
      category: 'team'
    },
    {
      id: 'td-06',
      dimension: 'type-discipline',
      prompt: '一个接口如果已经能被测试覆盖，我通常会觉得：',
      leftLabel: '测试够了，类型再严只是重复劳动',
      rightLabel: '测试和类型各管一层，缺一层都心里没底',
      polarity: 1,
      category: 'engineering'
    },
    {
      id: 'td-07',
      dimension: 'type-discipline',
      prompt: '我更容易被哪种代码说服是“写得稳”的？',
      leftLabel: '运行过很多真实用例、现场调试顺手的代码',
      rightLabel: '在接口层就把错误入口尽量封死的代码',
      polarity: 1,
      category: 'team'
    },
    {
      id: 'td-08',
      dimension: 'type-discipline',
      prompt: '如果一种语言允许我先模糊处理结构、后面再慢慢收紧，我会：',
      leftLabel: '把它视为效率红利',
      rightLabel: '把它视为需要主动克制的诱惑',
      polarity: 1,
      category: 'theory'
    },
    {
      id: 'td-09',
      dimension: 'type-discipline',
      prompt: '对于“类型是设计的一部分”这句话，我的直觉更接近：',
      leftLabel: '类型主要是辅助，不必抬到设计层面',
      rightLabel: '是的，类型往往决定了系统边界长什么样',
      polarity: 1,
      category: 'theory'
    },
    {
      id: 'td-10',
      dimension: 'type-discipline',
      prompt: '当我需要读一段陌生代码时，我更希望首先看到：',
      leftLabel: '几个真实调用样例和跑通路径',
      rightLabel: '输入、输出和约束被明确写在接口上',
      polarity: 1,
      category: 'engineering'
    }
  ],
  abstraction: [
    {
      id: 'ab-01',
      dimension: 'abstraction',
      prompt: '当两段逻辑大体相似但细节不同，我第一反应更像：',
      leftLabel: '先各写清楚，别急着抽成一套花活',
      rightLabel: '先找共同结构，尽快压缩成可复用形状',
      polarity: 1,
      category: 'engineering'
    },
    {
      id: 'ab-02',
      dimension: 'abstraction',
      prompt: '看到一串高阶函数、组合子或管道式写法时，我更容易觉得：',
      leftLabel: '太绕了，不如展开成顺序步骤',
      rightLabel: '这正是在把重复认知负担压下去',
      polarity: 1,
      category: 'theory'
    },
    {
      id: 'ab-03',
      dimension: 'abstraction',
      prompt: '如果一个 API 能用类型或组合规则表达“这类操作天然能拼接”，我会：',
      leftLabel: '觉得有点过度设计',
      rightLabel: '觉得这正是语言该帮忙表达的规律',
      polarity: 1,
      category: 'theory'
    },
    {
      id: 'ab-04',
      dimension: 'abstraction',
      prompt: '我对“先把领域概念抽干净，再写业务逻辑”的态度更接近：',
      leftLabel: '风险太高，容易抽出没人能懂的第二门语言',
      rightLabel: '如果领域会长期存在，这笔投资通常值得',
      polarity: 1,
      category: 'engineering'
    },
    {
      id: 'ab-05',
      dimension: 'abstraction',
      prompt: '团队代码评审时，我更常提醒别人：',
      leftLabel: '别绕，能直写就直写',
      rightLabel: '这里其实可以提炼成一个更清晰的通用模式',
      polarity: 1,
      category: 'team'
    },
    {
      id: 'ab-06',
      dimension: 'abstraction',
      prompt: '如果我必须在“看得懂一次”和“以后好组合很多次”之间选，我更偏向：',
      leftLabel: '优先让当前读者一眼跟住',
      rightLabel: '优先为长期组合和重用留接口',
      polarity: 1,
      category: 'engineering'
    },
    {
      id: 'ab-07',
      dimension: 'abstraction',
      prompt: '我更容易被哪种代码打动？',
      leftLabel: '把每一步都展开得直白干净的代码',
      rightLabel: '把核心模式提炼得像一套小代数的代码',
      polarity: 1,
      category: 'theory'
    },
    {
      id: 'ab-08',
      dimension: 'abstraction',
      prompt: '面对一个很通用但学习成本较高的抽象工具时，我更愿意：',
      leftLabel: '避开它，先选团队自然会写的那种形状',
      rightLabel: '学会它，只要它真能压缩重复复杂度',
      polarity: 1,
      category: 'team'
    },
    {
      id: 'ab-09',
      dimension: 'abstraction',
      prompt: '“业务代码不需要太多抽象”这句话在我耳朵里更像：',
      leftLabel: '一条常常正确的经验法则',
      rightLabel: '只在抽象做坏时才显得像真理',
      polarity: 1,
      category: 'team'
    },
    {
      id: 'ab-10',
      dimension: 'abstraction',
      prompt: '如果一门语言天然鼓励组合、映射和声明式结构，我通常会：',
      leftLabel: '觉得它在逼我换脑子',
      rightLabel: '觉得它在鼓励我把复杂度写得更整齐',
      polarity: 1,
      category: 'theory'
    }
  ],
  effects: [
    {
      id: 'ef-01',
      dimension: 'effects',
      prompt: '写业务逻辑时，我更喜欢：',
      leftLabel: '状态变化和 I/O 就地发生，别绕远路',
      rightLabel: '先把纯计算和副作用边界分开，再组合回去',
      polarity: 1,
      category: 'theory'
    },
    {
      id: 'ef-02',
      dimension: 'effects',
      prompt: '一个函数如果读取配置、打印日志、改写全局状态还返回结果，我通常会觉得：',
      leftLabel: '现实世界本来就这样，没必要假装干净',
      rightLabel: '这会让推理和测试成本悄悄上涨',
      polarity: 1,
      category: 'engineering'
    },
    {
      id: 'ef-03',
      dimension: 'effects',
      prompt: '我对“副作用最好显式建模”这件事的直觉更接近：',
      leftLabel: '适合研究论文，不必进日常代码',
      rightLabel: '这是在保护系统的可推理性',
      polarity: 1,
      category: 'theory'
    },
    {
      id: 'ef-04',
      dimension: 'effects',
      prompt: '当测试变难时，我更容易把原因归到：',
      leftLabel: '业务太复杂，不必怪写法',
      rightLabel: '状态和副作用没有被隔离清楚',
      polarity: 1,
      category: 'engineering'
    },
    {
      id: 'ef-05',
      dimension: 'effects',
      prompt: '如果一个团队习惯在函数里随手读写上下文，我通常会：',
      leftLabel: '觉得这很务实',
      rightLabel: '担心语义边界会越来越模糊',
      polarity: 1,
      category: 'team'
    },
    {
      id: 'ef-06',
      dimension: 'effects',
      prompt: '我更认同哪种说法？',
      leftLabel: '能把事情做成的副作用，不必被额外审判',
      rightLabel: '副作用不是原罪，但应该被清楚看见',
      polarity: 1,
      category: 'team'
    },
    {
      id: 'ef-07',
      dimension: 'effects',
      prompt: '看到“输入相同就该得到相同结果”的设计追求时，我更容易：',
      leftLabel: '觉得它太理想化',
      rightLabel: '觉得它是降低系统认知摩擦的关键习惯',
      polarity: 1,
      category: 'theory'
    },
    {
      id: 'ef-08',
      dimension: 'effects',
      prompt: '如果某个框架默认把状态、缓存、重试和网络副作用全自动包起来，我会：',
      leftLabel: '挺好，别让我每次都重新铺管线',
      rightLabel: '先高兴，再担心隐藏行为会不会太多',
      polarity: 1,
      category: 'engineering'
    },
    {
      id: 'ef-09',
      dimension: 'effects',
      prompt: '我更能接受哪种复杂度？',
      leftLabel: '运行时的动态行为复杂，但写起来直接',
      rightLabel: '前期建模稍复杂，但后续推理更稳',
      polarity: 1,
      category: 'team'
    },
    {
      id: 'ef-10',
      dimension: 'effects',
      prompt: '若一门语言鼓励把副作用放到显式边界之外，我通常会：',
      leftLabel: '觉得它是在强行拐弯',
      rightLabel: '觉得它是在逼我分清“算什么”和“做什么”',
      polarity: 1,
      category: 'theory'
    }
  ],
  control: [
    {
      id: 'ct-01',
      dimension: 'control',
      prompt: '只要平台足够成熟，我通常愿意：',
      leftLabel: '把内存、并发和运行时细节交给它',
      rightLabel: '仍然想保留对底层行为的清晰掌控',
      polarity: 1,
      category: 'engineering'
    },
    {
      id: 'ct-02',
      dimension: 'control',
      prompt: '面对性能问题时，我更希望手里有：',
      leftLabel: '成熟运行时和 profiler 替我兜底',
      rightLabel: '能直接触到内存布局和资源边界的能力',
      polarity: 1,
      category: 'engineering'
    },
    {
      id: 'ct-03',
      dimension: 'control',
      prompt: '我对“语言别替我太多做决定”的共鸣度更像：',
      leftLabel: '低，我更希望它把麻烦吸掉',
      rightLabel: '高，我想知道到底是谁在承担成本',
      polarity: 1,
      category: 'theory'
    },
    {
      id: 'ct-04',
      dimension: 'control',
      prompt: '当某个工具用“自动推断、自动管理、自动优化”打动大家时，我会：',
      leftLabel: '很买账，只要默认路径够稳',
      rightLabel: '先问它到底替我藏了哪些细节',
      polarity: 1,
      category: 'team'
    },
    {
      id: 'ct-05',
      dimension: 'control',
      prompt: '如果我要为一个长期运行、资源敏感的系统选栈，我更想要：',
      leftLabel: '平台成熟和部署顺手',
      rightLabel: '对成本模型和资源使用足够透明',
      polarity: 1,
      category: 'engineering'
    },
    {
      id: 'ct-06',
      dimension: 'control',
      prompt: '一门语言越是鼓励“把危险部分藏在后面”，我越容易：',
      leftLabel: '感到轻松',
      rightLabel: '担心真正危险的只是被推迟看见',
      polarity: 1,
      category: 'theory'
    },
    {
      id: 'ct-07',
      dimension: 'control',
      prompt: '我更能接受哪种失败？',
      leftLabel: '平台替我管太多，偶尔会摸不清底层原因',
      rightLabel: '我自己掌控更多，因此也必须自己负责后果',
      polarity: 1,
      category: 'team'
    },
    {
      id: 'ct-08',
      dimension: 'control',
      prompt: '阅读技术文档时，我更想先看到：',
      leftLabel: '高层心智模型和快速上手路径',
      rightLabel: '运行时行为、资源语义和底层约束',
      polarity: 1,
      category: 'engineering'
    },
    {
      id: 'ct-09',
      dimension: 'control',
      prompt: '如果一门语言默认阻止我做某些底层操作，我通常会：',
      leftLabel: '觉得这是好事，少踩坑',
      rightLabel: '想知道我何时还能把手伸到底下',
      polarity: 1,
      category: 'theory'
    },
    {
      id: 'ct-10',
      dimension: 'control',
      prompt: '我对“托管世界换来生产效率”这笔交易的态度更像：',
      leftLabel: '大多数时候很值',
      rightLabel: '只有当我确定代价真的可接受时才愿意签',
      polarity: 1,
      category: 'team'
    }
  ],
  engineering: [
    {
      id: 'en-01',
      dimension: 'engineering',
      prompt: '做一个新功能时，我更安心的节奏是：',
      leftLabel: '先把可用路径打通，再补边角与规整',
      rightLabel: '先把错误边界和结构想清，再开始铺实现',
      polarity: 1,
      category: 'engineering'
    },
    {
      id: 'en-02',
      dimension: 'engineering',
      prompt: '遇到明显还会变的需求时，我通常会：',
      leftLabel: '偏向最短实现，让反馈先回来',
      rightLabel: '仍然留一点结构冗余，避免第二周就推倒重来',
      polarity: 1,
      category: 'engineering'
    },
    {
      id: 'en-03',
      dimension: 'engineering',
      prompt: '我更认同哪种工程美德？',
      leftLabel: '能快点把真问题暴露出来的速度感',
      rightLabel: '能把未来事故拦在入口处的防守感',
      polarity: 1,
      category: 'team'
    },
    {
      id: 'en-04',
      dimension: 'engineering',
      prompt: '如果一个方案现在写起来更慢，但能大幅减少长期事故，我通常会：',
      leftLabel: '先怀疑这笔账算得太理想',
      rightLabel: '倾向接受这笔前置投资',
      polarity: 1,
      category: 'engineering'
    },
    {
      id: 'en-05',
      dimension: 'engineering',
      prompt: '在我看来，技术债最危险的地方是：',
      leftLabel: '它拖慢当下试错效率',
      rightLabel: '它让以后每次改动都需要向旧问题纳税',
      polarity: 1,
      category: 'team'
    },
    {
      id: 'en-06',
      dimension: 'engineering',
      prompt: '代码评审里我更常说的话会是：',
      leftLabel: '先合进去验证价值，细节可以后续追',
      rightLabel: '这个边界没讲清，以后接手的人会很痛苦',
      polarity: 1,
      category: 'team'
    },
    {
      id: 'en-07',
      dimension: 'engineering',
      prompt: '我更欣赏哪种团队默认姿态？',
      leftLabel: '把上线和反馈跑快，别让完美主义卡住产品',
      rightLabel: '把故障预防做扎实，别把问题转嫁给生产环境',
      polarity: 1,
      category: 'team'
    },
    {
      id: 'en-08',
      dimension: 'engineering',
      prompt: '当某个错误只在极端输入下才会发生时，我更可能：',
      leftLabel: '先记录风险，等它真的接近用户再修',
      rightLabel: '趁现在上下文还清楚，把口子补掉',
      polarity: 1,
      category: 'engineering'
    },
    {
      id: 'en-09',
      dimension: 'engineering',
      prompt: '对于“先有约束，才有速度”这句话，我更倾向于：',
      leftLabel: '觉得它常被说得过头',
      rightLabel: '觉得它在长期项目里经常成立',
      polarity: 1,
      category: 'theory'
    },
    {
      id: 'en-10',
      dimension: 'engineering',
      prompt: '选技术栈时，我更愿意为哪一项支付成本？',
      leftLabel: '更快起步和更顺手的试验速度',
      rightLabel: '更强的错误预防和可维护性保障',
      polarity: 1,
      category: 'engineering'
    }
  ],
  exploration: [
    {
      id: 'ex-01',
      dimension: 'exploration',
      prompt: '如果一种语言的思想很迷人，但团队几乎没人会，我通常会：',
      leftLabel: '优先选择更主流的替代品',
      rightLabel: '认真考虑引入，前提是它真的能改变问题结构',
      polarity: 1,
      category: 'team'
    },
    {
      id: 'ex-02',
      dimension: 'exploration',
      prompt: '我对“生态成熟度”在选型里的权重通常是：',
      leftLabel: '非常高，别把团队变成试验田',
      rightLabel: '高，但不会压过真正更好的语言模型',
      polarity: 1,
      category: 'engineering'
    },
    {
      id: 'ex-03',
      dimension: 'exploration',
      prompt: '看到一种新范式时，我第一反应更像：',
      leftLabel: '先问它能不能和现实团队协作',
      rightLabel: '先问它有没有把旧问题换了个更干净的坐标系',
      polarity: 1,
      category: 'theory'
    },
    {
      id: 'ex-04',
      dimension: 'exploration',
      prompt: '如果一门语言能显著改变我对程序结构的理解，我愿意：',
      leftLabel: '把它当副业兴趣，主战场还是主流工具',
      rightLabel: '找机会把它真正带进项目现场',
      polarity: 1,
      category: 'team'
    },
    {
      id: 'ex-05',
      dimension: 'exploration',
      prompt: '我更认同哪种说法？',
      leftLabel: '技术栈首先应该降低招聘和交接摩擦',
      rightLabel: '技术栈也应该给团队留下学习新范式的空间',
      polarity: 1,
      category: 'team'
    },
    {
      id: 'ex-06',
      dimension: 'exploration',
      prompt: '对于小众但设计优秀的语言，我通常会：',
      leftLabel: '欣赏归欣赏，生产还是算了',
      rightLabel: '保留实际采用的可能性，不把它们直接排除',
      polarity: 1,
      category: 'engineering'
    },
    {
      id: 'ex-07',
      dimension: 'exploration',
      prompt: '当主流方案已经“够用”时，我对继续寻找新范式的态度更像：',
      leftLabel: '没必要，再折腾就是给自己加戏',
      rightLabel: '有必要，很多上限就是在“够用之后”才被看见',
      polarity: 1,
      category: 'theory'
    },
    {
      id: 'ex-08',
      dimension: 'exploration',
      prompt: '我的技术舒适区更靠近：',
      leftLabel: '社区共识清晰、资料随手可得的路线',
      rightLabel: '需要自己啃一些概念，但视野会被打开的路线',
      polarity: 1,
      category: 'team'
    },
    {
      id: 'ex-09',
      dimension: 'exploration',
      prompt: '如果一个候选方案能让模型更优雅，却增加招聘和培训成本，我会：',
      leftLabel: '大概率放弃，团队流速优先',
      rightLabel: '认真权衡，因为语言模型本身也会改变团队效率',
      polarity: 1,
      category: 'engineering'
    },
    {
      id: 'ex-10',
      dimension: 'exploration',
      prompt: '我更容易被哪种技术演讲打动？',
      leftLabel: '如何在成熟生态里把系统做稳做大',
      rightLabel: '如何用新的语义模型重新理解程序',
      polarity: 1,
      category: 'theory'
    }
  ]
};

const categoryPattern: QuestionCategory[] = [
  'theory',
  'theory',
  'theory',
  'theory',
  'engineering',
  'engineering',
  'engineering',
  'engineering',
  'team',
  'team'
];

const reversedQuestionIndexes = new Set([1, 3, 5, 7, 9]);

function decorateQuestion(question: Question, index: number): Question {
  if (!reversedQuestionIndexes.has(index)) {
    return {
      ...question,
      category: categoryPattern[index],
      polarity: 1
    };
  }

  return {
    ...question,
    leftLabel: question.rightLabel,
    rightLabel: question.leftLabel,
    category: categoryPattern[index],
    polarity: -1
  };
}

export const questions = Array.from({ length: 10 }, (_, index) =>
  dimensionOrder.map((dimension) => decorateQuestion(bank[dimension][index], index))
).flat();

export const questionPages = Array.from({ length: questions.length / 10 }, (_, pageIndex) =>
  questions.slice(pageIndex * 10, pageIndex * 10 + 10)
);
