# 项目部署到 GitHub Pages

## 准备工作

1. **注册 GitHub 账号**
   - 访问 https://github.com
   - 点击 "Sign up" 注册账号

2. **创建 GitHub 仓库**
   - 登录 GitHub
   - 点击右上角的 "+" 号
   - 选择 "New repository"
   - 仓库名称：`my-blog`（或你喜欢的名字）
   - 选择 "Public" 公开仓库
   - **不要**勾选 "Initialize with README"
   - 点击 "Create repository"

## 方法一：使用 IDE 集成 Git 功能（推荐）

### VS Code 用户

1. **初始化 Git 仓库**
   - 打开左侧"源代码管理"面板（分支图标）
   - 点击"初始化仓库"按钮

2. **查看更改**
   - 你会看到所有文件显示在"更改"列表中

3. **提交更改**
   - 在输入框中输入：`feat: 博客项目初始化`
   - 点击"提交"按钮（✓ 图标）

4. **推送到 GitHub**
   - 点击"更多操作"（...图标）
   - 选择"推送到..."
   - 输入你刚创建的仓库地址：`https://github.com/你的用户名/my-blog.git`
   - 点击确认

5. **配置 Vite 构建输出**
   - 打开 `vite.config.js`
   - 修改为：
   ```javascript
   import { defineConfig } from 'vite'
   import vue from '@vitejs/plugin-vue'

   export default defineConfig({
     plugins: [vue()],
     base: '/my-blog/'  // 改成你的仓库名
   })
   ```

6. **构建项目**
   - 在终端运行：
   ```bash
   npm run build
   ```

7. **推送构建后的文件**
   - 将 `dist` 文件夹中的所有文件复制出来
   - 创建新的分支 `gh-pages`
   - 推送到 GitHub

---

## 方法二：使用 GitHub Desktop（可视化工具）

1. **下载安装**
   - 访问 https://desktop.github.com/
   - 下载 Windows 版本并安装
   - 使用 GitHub 账号登录

2. **添加本地仓库**
   - 点击 "File" → "Add Local Repository..."
   - 选择你的项目文件夹：`c:/Users/冯文豪/Desktop/fwh2/fwh`
   - 点击 "Add repository"

3. **发布到 GitHub**
   - 点击右上角的 "Publish repository"
   - 填写仓库名称：`my-blog`
   - 选择 "Public"
   - 点击 "Publish repository"

4. **构建并部署**
   ```bash
   npm run build
   ```
   - 将 `dist` 文件夹内容推送到 `gh-pages` 分支

---

## 方法三：使用命令行（需要安装 Git）

### 1. 初始化仓库
```bash
cd c:/Users/冯文豪/Desktop/fwh2/fwh
git init
```

### 2. 添加文件
```bash
git add .
```

### 3. 提交更改
```bash
git commit -m "feat: 博客项目初始化"
```

### 4. 连接远程仓库
```bash
git remote add origin https://github.com/你的用户名/my-blog.git
```

### 5. 推送代码
```bash
git push -u origin master
```

### 6. 配置 Vite
修改 `vite.config.js`：
```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/my-blog/'
})
```

### 7. 构建项目
```bash
npm run build
```

### 8. 部署到 gh-pages 分支
```bash
git subtree push --prefix dist origin gh-pages
```

---

## 启用 GitHub Pages

1. 进入你的 GitHub 仓库
2. 点击 "Settings" 标签
3. 左侧菜单找到 "Pages"
4. 在 "Build and deployment" 下：
   - Source 选择：`Deploy from a branch`
   - Branch 选择：`gh-pages`
   - Folder 选择：`/(root)`
5. 点击 "Save"

等待 1-2 分钟后，访问：`https://你的用户名.github.io/my-blog/`

---

## 常见问题

**Q: 推送失败怎么办？**
- 确认仓库名称和地址正确
- 确认仓库是 Public 而非 Private

**Q: 访问 404 怎么办？**
- 检查 `vite.config.js` 中的 `base` 是否正确
- 确认 GitHub Pages 的分支是 `gh-pages`
- 等待几分钟，部署需要时间

**Q: 部署后样式丢失？**
- 确保 `base` 配置与仓库名一致
- 重新构建并推送：`npm run build`

---

## 推荐流程（最简单）

如果你没有 Git 和 IDE 的经验，推荐使用：

1. **GitHub Desktop**（可视化，最简单）
2. **IDE 集成 Git**（如 VS Code，无需额外安装）

两种方法都是图形界面操作，不需要记命令！
