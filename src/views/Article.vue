<template>
  <div class="article-page">
    <div class="page-container">
      <!-- 返回首页按钮 -->
      <div class="back-btn">
        <router-link to="/">← 返回首页</router-link>
      </div>

      <!-- 文章详情 -->
      <div class="article-detail" v-if="article">
        <h1 class="detail-title">{{ article.title }}</h1>
        <p class="detail-meta">
          发布时间：{{ article.time }} | 分类：{{ article.category }}
        </p>

        <div class="detail-content">
          {{ article.content }}
        </div>
      </div>

      <!-- 文章不存在提示 -->
      <div class="no-article" v-else>
        抱歉，该文章不存在或已被删除！
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

// 获取路由参数（文章ID）
const route = useRoute();
// 定义文章响应式数据
const article = ref(null);

// 你的喜好内容 + GitHub部署教程（共4篇文章）
const articleDetailList = [
  {
    id: 1,
    title: "我的视频剪辑心得：新手快速上手Pr的3个核心技巧",
    time: "2025-12-30",
    category: "视频剪辑",
    content: `### 一、剪辑前期准备
1.  素材整理：将拍摄/下载的素材按场景、时长分类存放，命名清晰（如：场景1-对话.mp4），避免剪辑时找不到素材
2.  脚本规划：提前写好剪辑脚本，明确每一段的画面、背景音乐、字幕，减少后期反复修改
3.  软件设置：Pr中调整序列设置（匹配素材分辨率/帧率），默认使用H.264编码，方便后续导出分享

### 二、核心剪辑技巧
1.  剪切精准度：使用“标记点”功能标记需要剪切的位置，配合快捷键Ctrl+K快速分割素材，避免画面卡顿
2.  转场慎用：新手建议少用复杂转场（如旋转、模糊），优先使用硬切、淡入淡出，保持画面流畅
3.  音频同步：剪辑时先对齐音频（尤其是人物对话），再调整画面，确保音画不同步，提升观看体验

### 三、后期优化
1.  调色：使用Pr的“基本校正”面板调整曝光、对比度、饱和度，新手可直接套用预设（如LUTs）
2.  字幕：添加字幕时注意字体大小和颜色（建议白色字体+黑色描边），避免遮挡关键画面
3.  导出设置：根据使用场景选择分辨率（抖音/快手选1080P竖屏，B站选1080P横屏），比特率适中即可`
  },
  {
    id: 2,
    title: "漫画收藏与赏析：那些让我反复回看的经典日系漫画",
    time: "2025-12-29",
    category: "漫画爱好",
    content: `### 一、我的漫画收藏清单
1.  《灌篮高手》：青春与热血的代名词，樱木花道的成长线让人热泪盈眶，篮球比赛的分镜堪称教科书级别
2.  《夏目友人帐》：治愈系漫画的天花板，夏目贵志与猫咪老师的温馨日常，教会我们温柔对待世界
3.  《海贼王》：长篇漫画的标杆，宏大的世界观、鲜明的人物性格、感人的剧情，连载20余年依旧火爆
4.  《孤独的美食家》：美食漫画的经典，五郎大叔的沉浸式干饭场景，让人食欲大开，同时了解日本各地美食

### 二、漫画赏析心得
1.  分镜设计：优秀的漫画分镜能引导读者的视线，营造出电影般的画面感（如《灌篮高手》的篮球比赛分镜）
2.  人物塑造：立体的人物性格是漫画的灵魂，即使是配角也有自己的故事线（如《海贼王》的配角团）
3.  剧情节奏：张弛有度的剧情节奏能让读者欲罢不能，热血剧情穿插温馨日常，避免审美疲劳
4.  主题表达：好的漫画不仅有精彩的剧情，还能传递深刻的主题（如《夏目友人帐》的“温柔”与“救赎”）

### 三、漫画收藏小技巧
1.  保存方式：正版漫画建议放在书架上，避免阳光直射和潮湿环境，防止纸张发黄、变形
2.  版本选择：优先选择正版单行本，收藏价值更高；部分漫画有精装版、纪念版，可根据喜好收藏
3.  整理分类：按漫画类型（热血、治愈、悬疑）或作者分类存放，方便快速查找`
  },
  {
    id: 3,
    title: "配音小白入门指南：如何练就好听的配音声线",
    time: "2025-12-28",
    category: "声音配音",
    content: `### 一、基础发声练习
1.  气息训练：采用“腹式呼吸”，平躺时感受腹部起伏，日常练习深呼吸（吸气4秒，屏息2秒，呼气6秒），提升气息稳定性
2.  声带放松：避免用嗓子硬喊，练习“气泡音”（喉咙放松，发出类似气泡的低沉声音），保护声带同时让声音更有磁性
3.  咬字清晰：练习绕口令（从慢到快），重点纠正平舌音/翘舌音、前鼻音/后鼻音，确保台词清晰易懂

### 二、声线塑造技巧
1.  了解自己的声线：先录制自己的自然声音，判断是正太音、青年音、少女音还是御姐音，优先发挥自身声线优势
2.  模仿练习：选择自己喜欢的角色（动漫/影视剧），反复听原声，模仿语气、语速、情感表达，逐步形成自己的风格
3.  情感融入：配音不是“念台词”，要理解角色的情绪（开心、悲伤、愤怒），通过声音的高低、快慢传递情感
4.  细节处理：根据角色性格调整声音细节（如活泼角色声音偏高、语速偏快；沉稳角色声音偏低、语速偏慢）

### 三、新手必备工具
1.  录音设备：新手无需昂贵设备，手机+普通麦克风即可；进阶后可选择电容麦克风（如Blue Yeti），提升录音质量
2.  音频软件：使用Audacity（免费）或Adobe Audition（专业），进行降噪、音量调整、后期处理
3.  参考素材：在配音平台（如喜马拉雅、克拉克拉）查找剧本和原声素材，方便练习和展示作品`
  },
  {
    id: 4,
    title: "详细教程：将Vue个人博客部署到GitHub Pages",
    time: "2025-12-27",
    category: "技术教程",
    content: `### 一、部署前准备
1.  拥有GitHub账号：若没有，先在GitHub官网（https://github.com/）注册账号并登录
2.  项目打包：在Vue博客项目根目录执行npm run build，生成dist文件夹（静态部署文件）
3.  安装Git：本地安装Git（https://git-scm.com/），并配置用户信息（关联GitHub账号）：
    git config --global user.name "你的GitHub用户名"
    git config --global user.email "你的GitHub注册邮箱"

### 二、步骤1：在GitHub创建仓库
1.  登录GitHub后，点击右上角“+”号，选择“New repository”
2.  仓库名称要求：必须是「你的用户名.github.io」（如：zhangsan.github.io），否则无法正常访问
3.  其他设置：勾选“Public”（公开仓库），可选择是否初始化README文件，然后点击“Create repository”

### 三、步骤2：上传打包文件到GitHub仓库
1.  打开本地dist文件夹，右键选择“Git Bash Here”（打开Git终端）
2.  初始化Git仓库：
    git init
3.  添加所有文件：
    git add .
4.  提交文件：
    git commit -m "部署Vue博客到GitHub Pages"
5.  关联GitHub仓库（替换为你的仓库地址）：
    git remote add origin https://github.com/你的用户名/你的用户名.github.io.git
6.  推送文件到仓库（首次推送用-u参数）：
    git push -u origin main

### 四、步骤3：开启GitHub Pages服务
1.  进入你的GitHub仓库，点击顶部“Settings”（设置）
2.  下拉页面找到“Pages”选项（在左侧导航栏下方）
3.  配置来源：“Source”选择“main”分支，“Folder”选择“/root”（根目录），然后点击“Save”
4.  等待部署：页面会显示“Your site is live at https://你的用户名.github.io/”，稍等1-5分钟即可访问

### 五、常见问题解决
1.  页面404：检查仓库名称是否正确（必须是用户名.github.io），分支和文件夹配置是否正确
2.  样式丢失：修改vite.config.js，添加base配置（base: '/仓库名/'，若仓库名是用户名.github.io则base: '/'）
3.  推送失败：检查Git是否关联GitHub账号，或是否有仓库访问权限（可使用SSH密钥替代HTTPS地址）`
  }
];

// 页面挂载时，根据文章ID获取详情
onMounted(() => {
  const articleId = Number(route.params.id);
  article.value = articleDetailList.find(item => item.id === articleId);
});
</script>

<style scoped>
.article-page {
  padding: 30px 0;
  background-color: #f9f9f9;
}

.page-container {
  width: 85%;
  margin: 0 auto;
}

.back-btn {
  margin-bottom: 20px;
}

.back-btn a {
  text-decoration: none;
  color: #42b983;
  font-size: 15px;
}

.article-detail {
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.04);
  line-height: 1.8;
}

.detail-title {
  color: #333;
  font-size: 24px;
  margin-bottom: 15px;
  text-align: center;
}

.detail-meta {
  color: #999;
  font-size: 14px;
  text-align: center;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.detail-content {
  color: #333;
  font-size: 16px;
  white-space: pre-line; /* 保留文本换行格式 */
}

.no-article {
  color: #f56c6c;
  font-size: 18px;
  text-align: center;
  padding: 50px 0;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.04);
}
</style>