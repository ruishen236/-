// 原创题库：只参考公开的题型；correct 为正确选项的下标（从 0 开始）。
export const questions = [
  {id:1,category:'数学逻辑',level:1,title:'从一个小问题开始',prompt:'一本笔记本售价6元。买4本同样的笔记本，一共需要多少元？',options:['18元','24元','30元','36元'],correct:1,explanation:'6 × 4 = 24。'},
  {id:2,category:'数字规律',level:1,title:'找到数字的节奏',prompt:'下面的数列每次增加相同的数。问号处应该填什么？',sequence:['3','7','11','15','?'],options:['17','18','19','21'],correct:2,explanation:'相邻两项的差是4，15 + 4 = 19。'},
  {id:3,category:'空间推理',level:1,title:'在脑海中转动它',prompt:'将图中的箭头顺时针旋转90°，它会指向哪个方向？',diagram:'arrow',options:['上方 ↑','右方 →','下方 ↓','左方 ←'],correct:1,explanation:'向上的箭头顺时针旋转90°后指向右方。'},
  {id:4,category:'数学逻辑',level:2,title:'找出未知的数量',prompt:'两个盒子各装有相同数量的球，盒子外还有5个球。共有21个球，每个盒子里有几个？',options:['6个','7个','8个','9个'],correct:2,explanation:'(21 − 5) ÷ 2 = 8。'},
  {id:5,category:'数字规律',level:2,title:'不止是简单相加',prompt:'每一项都是前一项乘以2，再加1。问号处应该填什么？',sequence:['2','5','11','23','?'],options:['45','46','47','49'],correct:2,explanation:'23 × 2 + 1 = 47。'},
  {id:6,category:'空间推理',level:2,title:'看见图形的全部',prompt:'图中共有多少个正方形？只计算边沿着网格线的正方形。',diagram:'squares',options:['4个','5个','6个','9个'],correct:1,explanation:'4个小正方形，加1个大正方形，共5个。'},
  {id:7,category:'数学逻辑',level:3,title:'把符号变成数字',prompt:'两个圆的数值之和为4，一个三角形加一个圆等于7。同种图形代表同一个数。两个三角形加一个圆，等于多少？',diagram:'equation',options:['9','10','12','14'],correct:2,explanation:'圆 = 2，三角形 = 5，因此5 + 5 + 2 = 12。'},
  {id:8,category:'数字规律',level:3,title:'观察变化的变化',prompt:'相邻两项的差依次为2、4、6、8……，每次增加2。下一项是什么？',sequence:['4','6','10','16','24','?'],options:['30','32','34','36'],correct:2,explanation:'下一个差为10，所以24 + 10 = 34。'},
  {id:9,category:'空间推理',level:3,title:'补全方向矩阵',prompt:'每一行从左到右，箭头都顺时针旋转90°。问号处应该是哪一个箭头？',diagram:'matrix',options:['↑','→','↓','←'],correct:0,explanation:'第三行依次是下、左、上。'},
  {id:10,category:'数学逻辑',level:4,title:'时间里的等式',prompt:'父亲现在的年龄是女儿的3倍。12年后，父亲的年龄是女儿的2倍。女儿现在多少岁？',options:['6岁','10岁','12岁','18岁'],correct:2,explanation:'设女儿为x岁，3x + 12 = 2(x + 12)，解得x = 12。'},
  {id:11,category:'数字规律',level:4,title:'两条交错的线索',prompt:'奇数位置上的数每次加3，偶数位置上的数每次减4。问号处应该填什么？',sequence:['2','30','5','26','8','22','11','?'],options:['14','15','18','19'],correct:2,explanation:'偶数位置依次为30、26、22、18。'},
  {id:12,category:'空间推理',level:4,title:'从平面折成立体',prompt:'将这个展开图折成正方体，哪个面与B面相对？',diagram:'net',options:['A面','C面','D面','E面'],correct:2,explanation:'A、C、E、F与B相邻，D折到B的对面。'},
  {id:13,category:'数学逻辑',level:5,title:'反转后的秘密',prompt:'一个两位数的十位数字与个位数字之和为9。将两个数字交换位置后，原数比新数大27。原数是多少？',options:['54','63','72','81'],correct:1,explanation:'设十位a，个位b。a+b=9，9(a−b)=27，所以a=6，b=3。'},
  {id:14,category:'数字规律',level:5,title:'连接前面的线索',prompt:'从第3项起，每一项等于前两项之和再加1。下一项是什么？',sequence:['1','2','4','7','12','20','?'],options:['31','32','33','34'],correct:2,explanation:'12 + 20 + 1 = 33。'},
  {id:15,category:'空间推理',level:5,title:'最后一道空间挑战',prompt:'一个大正方体的六个面都涂了蓝色，然后沿每条边均分成4份，切成64个小正方体。恰好有两个面被涂色的小正方体有多少个？',diagram:'cube',options:['8个','16个','24个','32个'],correct:2,explanation:'位于12条棱上但不是顶点，每条棱有4−2=2个，共12 × 2 = 24。'},
];
