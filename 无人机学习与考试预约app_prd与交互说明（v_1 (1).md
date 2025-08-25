# 一、产品概述

**产品名称**：PilotGo（无人机学习与考试预约）\
**平台形态**：iOS / Android（App），配套Web管理后台\
**目标用户**：

- 学员：准备获取/升级无人机执照（VLOS/BVLOS/教员）的个人/企业员工
- 机构：培训机构、考点、讲师
- 管理者：平台运营、内容审核、题库与考试维护、排期管理

**核心价值**：

- 一站式：课程学习（免费/付费）→ 模拟练习（免费/付费）→ 培训预约 → 考试预约 → 成绩与证书跟踪
- 合规可控：支持机构资质、讲师资质与课程/题库合规审核与留痕
- 数据驱动：基于题目难度与知识点画像的自适应训练与通过率提升

**关键目标**：

- 30天内完成入门课程+2次模拟考试→提升首考通过率
- 课程完课率≥70%，模拟题转化（免费→付费）≥25%
- 培训与考位满班率≥85%

---

# 二、用户角色与权限

| 角色   | 权限要点                                                    |
| ---- | ------------------------------------------------------- |
| 学员   | 浏览课程/题库、加入学习计划、购买付费课程/模拟、预约培训/考试、退款申请、消息通知、成绩/证书查看、发票申请 |
| 讲师   | 课程创建与维护、直播排期、作业与答疑、题库出题与解析维护、查看班级学情                     |
| 培训机构 | 培训班期创建、名额容量、价格与促销、场地与讲师排班、签到/结课、学员考勤                    |
| 考点   | 考位发布、考试规则与物料清单、考前核验、成绩上报、异常上报与复核                        |
| 平台运营 | 内容/机构/讲师资质审核、题库审核、订单/退款/发票处理、活动配置、风控与合规模块               |

---

# 三、信息架构（App）

**首页**：学习路径卡片、快速入口（免费题库/模拟考试/预约培训/预约考试）、轮播活动、继续学习、消息

**学习**：课程目录（免费/付费、视频/直播/图文/练习）、课程详情、学习计划、离线下载

**练习**：题库（章节练习/知识点/易错题/收藏）、模拟考试（免费/付费）、错题本、解析与笔记

**预约**：培训预约（机构/讲师/时间/地点/容量/价格）、考试预约（科目/等级/考点/时间/费用）

**我的**：订单/优惠券/发票、证书与成绩、学习报告、实名认证/KYC、消息与通知、设置与帮助

---

# 四、关键业务流程

## 4.1 学习路径

1. 新用户测评 → 生成学习画像（目标等级、薄弱知识点）
2. 推荐课程（免费先行 + 付费进阶）
3. 章节练习 → 自适应出题 → 错题强化
4. 免费模拟1-2套 → 解锁付费模拟与专项冲刺
5. 预约培训 → 线下/线上直播集训
6. 预约考试 → 考前清单 → 入场核验 → 出分与报告

## 4.2 预约培训

- 选择机构/讲师/班期 → 查看名额与评价 → 选择套餐（基础/强化/私教）→ 提交订单 → 支付 → 入班 → 开课提醒 → 签到/请假 → 结课证书

## 4.3 预约考试

- 选择等级/科目 → 选择考点与场次 → 阅读规则与退改政策 → 支付报名费 → 准考证生成 → 考前核验清单 → 考后出分与复核通道

## 4.4 免费/付费模式

- 免费课程：基础理论、公开课、样章
- 付费课程：系统班、冲刺班、题库精讲、直播
- 免费模拟：每日一套/限题量、无解析或延迟解析
- 付费模拟：完整套卷、权威解析、智能测评、全真时间限制与及格线、成绩对比与预测

---

# 五、页面与字段（App端）

## 5.1 首页

- 组件：搜索框、学习路径卡、轮播Banner、继续学习、热门课程、热门题库、活动入口、预约入口
- 统计字段：曝光/点击/转化、卡片位置、来源渠道、AB版本

## 5.2 课程列表

- 筛选：等级（VLOS/BVLOS/教员）、类型（视频/直播/图文/练习）、价格（免费/付费）、难度、时长、机构、讲师、评分
- 卡片字段：课程ID、标题、封面、机构/讲师、总时长、章节数、难度、评分、价格/折扣、是否支持离线

## 5.3 课程详情

- 基础：课程ID、标题、副标题、封面、简介、适用等级、总时长、章节结构、样章试看
- 师资：讲师名片（认证状态、授课小时、好评率）
- 价格：原价、现价、促销、拼团/赠课、可用券
- 权益：班级群、答疑、作业批改、结课证书
- 行为：加入学习/立即购买/立即学习、收藏、分享

## 5.4 播放/学习页

- 视频播放器（倍速/续播/弹题）、章节目录、课件下载、笔记/标记重点、讨论区
- 学习进度：已学时长/完成度、学习时长提醒

## 5.5 题库列表

- 分类：按科目/知识点/难度/题型
- 标签：历年真题、易错题、收藏夹、错题本

## 5.6 练习页（章节/专项）

- 题干、选项/作答区、计时、收藏/标记、解析（免费/付费控制）、知识点链接
- 题型：单选/多选/判断/填空/简答/计算
- 交互：提交/下一题、查看本题解析、报告

## 5.7 模拟考试页

- 试卷信息：名称、题量、时长、及格线、可用次数（免费/付费）、是否含解析
- 控制：开始考试（防作弊设置：前台检测、摄像头授权可选）、中断继续
- 交卷：得分、用时、各知识点得分、难度曲线、建议复习路径

## 5.8 错题本/收藏/笔记

- 支持按知识点/时间/难度筛选、二次练习、导出PDF（付费权益）

## 5.9 预约培训

- 列表：机构卡片（认证、评分、距离/线上）、班期、容量、价格、支持退款规则
- 详情：课程大纲、上课地点/直播链接、日程、讲师、设备清单、签到方式、退改规则
- 订单：报名人信息（实名/证件）、发票抬头、价格与优惠、支付方式、协议勾选

## 5.10 预约考试

- 条件：等级/科目、考点、场次、名额、费用、须知（违禁物/入场核验/迟到规则）
- 结果：准考证（二维码/条码）、考前提醒清单、导航与联系人

## 5.11 我的

- 证书与成绩：模拟成绩趋势、培训结课证、考试成绩单
- 订单与发票：订单列表、退款/售后、电子发票开具
- 优惠券/会员：券包、权益说明、购买记录
- 实名/KYC：姓名、证件类型/号、面部核验、机构关联
- 设置：消息/隐私、下载管理、清缓存、设备授权

---

# 六、收费/免费策略与规则

## 6.1 课程

- 免费：基础公开课、样章、部分练习
- 付费：整套课程（一次性/订阅）、班课（固定班期）、私教（小时包）
- 促销：限时折扣、拼团、拉新赠课、机构券/平台券、学分抵扣

## 6.2 模拟考试

- 免费模式：限题量（每日上限/周上限）、不含或延迟解析、成绩记录但不出详细报告
- 付费模式：完整套卷、权威解析、知识点诊断、下载报告、错题导出、排名对比、保过包（含重考券）

## 6.3 预约与退改

- 培训：开班前N天可全退，临近按阶梯收取手续费；支持名额转让一次
- 考试：遵循考点规则，可选“退改险”

---

# 七、数据模型（核心表与字段）

> 仅示例关键字段；类型为建议值，后端可据栈调整（如PostgreSQL）。

**users**(id UUID, mobile VARCHAR, email VARCHAR, password\_hash TEXT, real\_name VARCHAR, id\_type SMALLINT, id\_no VARCHAR, kyc\_status SMALLINT, role SMALLINT, created\_at TIMESTAMPTZ, status SMALLINT)

**institutions**(id UUID, name VARCHAR, license\_no VARCHAR, verified BOOLEAN, rating NUMERIC, city VARCHAR, address TEXT)

**instructors**(id UUID, user\_id UUID, cert\_no VARCHAR, bio TEXT, rating NUMERIC)

**courses**(id UUID, title VARCHAR, level SMALLINT, type SMALLINT, price\_cents INT, is\_free BOOLEAN, duration\_min INT, org\_id UUID, status SMALLINT)

**course\_sections**(id UUID, course\_id UUID, title VARCHAR, idx INT)

**lessons**(id UUID, section\_id UUID, title VARCHAR, media\_url TEXT, duration\_sec INT, free\_preview BOOLEAN)

**exam\_papers**(id UUID, name VARCHAR, level SMALLINT, is\_paid BOOLEAN, duration\_min INT, pass\_score INT, source SMALLINT)

**questions**(id UUID, stem TEXT, type SMALLINT, options JSONB, answer JSONB, analysis TEXT, knowledge\_tags TEXT[], difficulty NUMERIC)

**paper\_questions**(paper\_id UUID, question\_id UUID, idx INT, score NUMERIC)

**practice\_sessions**(id UUID, user\_id UUID, mode SMALLINT, paper\_id UUID, started\_at TIMESTAMPTZ, finished\_at TIMESTAMPTZ, score NUMERIC, report JSONB)

**training\_batches**(id UUID, org\_id UUID, title VARCHAR, level SMALLINT, start\_date DATE, end\_date DATE, capacity INT, price\_cents INT, location TEXT, online\_link TEXT, refund\_policy JSONB)

**exam\_slots**(id UUID, center\_id UUID, level SMALLINT, subject SMALLINT, start\_time TIMESTAMPTZ, capacity INT, fee\_cents INT, policy JSONB)

**orders**(id UUID, user\_id UUID, type SMALLINT, item\_id UUID, amount\_cents INT, coupon\_id UUID, pay\_status SMALLINT, refund\_status SMALLINT)

**coupons**(id UUID, title VARCHAR, type SMALLINT, scope JSONB, threshold\_cents INT, discount\_cents INT, start\_at TIMESTAMPTZ, end\_at TIMESTAMPTZ)

**certificates**(id UUID, user\_id UUID, type SMALLINT, issuer VARCHAR, issued\_at TIMESTAMPTZ, meta JSONB)

**notifications**(id UUID, user\_id UUID, type SMALLINT, title VARCHAR, content TEXT, read BOOLEAN, created\_at TIMESTAMPTZ)

---

# 八、题库与出题引擎

- 题型支持：单选、多选、判断、填空、简答、计算、组合题
- 难度分层：E/M/H（或0-1连续难度）
- 自适应：根据用户历史正确率与知识点掌握度，动态抽题
- 反作弊：随机题序/选项、离线不可作答、切屏告警（次数阈值）、摄像头/麦克风可选监考
- 解析体系：标准答案+知识点链接+出处+视频讲解（付费解锁）
- 报告：总分、知识点雷达、时间分布、难度曲线、同级别对比、下一步学习建议

---

# 九、预约与排期引擎

- 名额库存：训练批次/考位为独立库存；下单冻结（TTL），支付成功扣减
- 冲突校验：时间冲突提示；同一时段仅可持有一个冻结名额
- 政策引擎：退改规则、最低开班人数、自动取消阈值、等待名单
- 通知：报名成功、开课提醒、改期成功、考前清单、成绩发布

---

# 十、订单、支付与发票

- 支付：微信/支付宝/银联、分期（第三方）、企业对公
- 订单类型：课程、训练、模拟试卷、考试报名、会员/增值服务
- 退款：原路退回、阶梯手续费、自动/人工复核
- 发票：普票/专票、抬头与税号、开票状态、下载PDF

---

# 十一、会员与增值

- 会员权益：高级题库/解析、无限模拟、错题导出、下载报告、直播回放、专属客服
- 计费：月/季/年；含企业版席位包

---

# 十二、风控与合规

- 实名认证与人脸核验；机构与讲师资质审核与年检
- 内容审核：课程与题库双审、版权与DRM、防录屏（系统级限制+水印）
- 隐私：数据分级与最小化、合规存储（日志留存）、未成年人保护

---

# 十三、运营与增长

- 拉新：新人礼包、首购立减、裂变拼团、好友助力开锁
- 留存：连续学习打卡、学习里程碑徽章、学习挑战赛
- 转化：免费→付费漏斗、退课挽留（换班/代金券）、私教咨询
- 数据看板：DAU、完课率、模拟覆盖率、通过率、ARPU、R7留存

---

# 十四、后台（Web）功能清单

**内容中心**：课程/章节/课件、题库管理（导入/审核/版本/禁用）、试卷组卷、解析与视频维护\
**组织中心**：机构、讲师、资质与合同、结算与对账\
**排期中心**：培训批次、场地、讲师排班、考位与场次发布、容量与政策\
**交易中心**：订单、退款、发票、券与促销、价格策略、会员套餐\
**风控合规**：实名认证、敏感词、举报与处理、日志与审计\
**报表中心**：学情分析、题目质量（区分度/难度/歧义度）、通过率、营收与ROI

---

# 十五、关键交互草图（文字）

- **模拟考试开考**：点击→规则弹窗（时长/切屏限制/是否含解析）→ 同意并开始 → 计时器常驻 → 中途离开提醒 → 交卷确认 → 报告页
- **预约考试**：选择科目与考点→选择场次→须知与政策→确认信息→支付→准考证生成→短信/站内信提醒
- **预约培训**：选择机构→筛选班期→查看讲师评价→选择套餐→下单→支付→入班群/开课推送

---

# 十六、接口示例（REST，示意）

GET /api/courses?level=BVLOS&free=true\
GET /api/exam/papers/{id}\
POST /api/practice/start {paper\_id, mode}\
POST /api/practice/submit {session\_id, answers[]}\
GET /api/trainings?city=SZ&date=2025-09-01\
POST /api/trainings/{id}/order\
GET /api/exams/slots?level=VLOS&city=NJ\
POST /api/exams/{slot\_id}/order\
POST /api/payments/create {order\_id, channel}\
POST /api/refunds/create {order\_id, reason}

---

# 十七、状态与枚举（节选）

- 用户：active / suspended / deleted
- 订单支付：unpaid / paying / paid / failed / refunded / partial\_refund
- 退款：applied / reviewing / approved / rejected / completed
- 考位库存：available / hold / sold / closed
- 模拟模式：free\_daily / free\_limited / paid\_full

---

# 十八、边界与异常场景

- 下单未支付占用名额：设置10分钟TTL，超时自动释放；防黄牛IP/设备限购
- 切屏作弊：超过3次直接交卷或扣分，策略可配
- 内容纠错：题目争议流程（提交→审核→回溯成绩修正）
- 退改高峰：自动分流+机器人客服，提供改期券与等待名单
- 直播大课：高并发限流、CDN与备用线路、回放24小时内产出

---

# 十九、非功能性与质量

- 性能：P95页面<2s；考试页题目切换<150ms；成绩报告生成<5s
- 可用性：核心交易SLA 99.9%
- 安全：OAuth2+JWT、TLS1.2+、签名防篡改、重要操作二次确认
- 日志：行为埋点、考试留痕（起止时间/切屏/摄像权限）

---

# 二十、里程碑

- M1（4周）：MVP（免费课程+免费练习+培训/考试预约下单）
- M2（8周）：付费课程、付费模拟、错题本与报告、发票
- M3（12周）：会员体系、自适应出题、机构SaaS化后台

---

# 二十一、验收清单（MVP）

- 免费课程可学、题库可练、至少1家机构的班期可预约并完成支付
- 免费模拟（限题量）与报告（简版）
- 预约考试下单与准考证生成
- 订单/退款/发票闭环与消息通知

> 如需，我可以继续输出低保真原型说明、数据库DDL示例、埋点事件字典与AB实验方案。

就排
