# I IKUN2004 · HTML 作品集

一个用于免费展示与分享 HTML 页面作品的静态网站。仓库首页是作品目录，每个项目放在 `projects/` 下，保持独立的 HTML、CSS、JavaScript 和图片资源。

## 在线体验

仓库发布到 GitHub Pages 后，访问：

- 作品集首页：`https://i-ikun2004.github.io/html-showcase/`
- 拾鲜集：`https://i-ikun2004.github.io/html-showcase/projects/shixianji/`

> 上述地址需在仓库创建并启用 GitHub Pages 后才会生效。

## 已发布作品

| 作品 | 简介 | 入口 |
| --- | --- | --- |
| 拾鲜集 | 九个子页面的响应式超市购物演示，包含搜索、筛选、商品详情、收藏、购物车、优惠码与演示订单 | [进入项目](projects/shixianji/index.html) |

## 目录结构

```text
index.html                 # 作品集首页
assets/portfolio.css       # 作品集样式
projects/
  shixianji/
    index.html             # 拾鲜集首页
    shop.html              # 商品列表
    product.html           # 商品详情
    favorites.html         # 收藏
    cart.html              # 购物车
    checkout.html          # 演示结算
    orders.html            # 演示订单
    member.html            # 会员中心
    about.html             # 关于页面
    assets/                # 项目专属样式、脚本和图片
```

## 添加下一个项目

1. 在 `projects/` 中新建独立文件夹，例如 `projects/new-project/`。
2. 放入 `index.html` 和所需的资源，使用相对路径引用资源与子页面。
3. 在仓库根目录的 `index.html` 增加一张作品卡片，链接到 `projects/new-project/index.html`。
4. 推送到 `main` 后，GitHub Pages 会更新静态站点。

## 发布设置

仓库需为公开仓库。在 **Settings → Pages → Build and deployment** 中选择 **Deploy from a branch**，选择 `main` 分支和 `/ (root)` 目录并保存。根目录中的 `.nojekyll` 让静态文件直接发布。

## 说明

拾鲜集是前端交互作品：商品、价格、评价和配送均为演示信息。结算不会收款或发货，购物车、收藏和订单使用浏览器本地存储。浏览器清除数据后，演示记录会消失。

设计与开发：**I IKUN2004**。
