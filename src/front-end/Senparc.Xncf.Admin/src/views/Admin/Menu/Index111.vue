<template>
  <div class="el-main">
    <div class="admin-role">
      <div class="filter-container">
        <el-button
          class="filter-item"
          type="primary"
          icon="el-icon-plus"
          @click="handleEdit('', '', 'add')"
          >增加菜单
        </el-button>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
        border
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column prop="menuName" align="left" label="菜单名称" />
        <el-table-column prop="sort" align="center" label="排序" sortable />
        <el-table-column prop="adminRemark" align="center" label="备注" />
        <el-table-column prop="remark" align="center" label="说明" />
        <el-table-column align="center" label="添加时间">
          <template slot-scope="scope">
            {{ scope.row.addTime | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row, 'edit')"
              >编辑
            </el-button>
            <el-button
              v-if="scope.row.children"
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row, 'addNext')"
              >增加下一级
            </el-button>
            <el-popconfirm
              placement="top"
              title="确认删除此菜单吗？"
              @confirm="handleDelete(scope.$index, scope.row)"
            >
              <el-button slot="reference" size="mini" type="danger"
                >删除</el-button
              >
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!--编辑、新增 -->
      <el-dialog
        :title="dialog.title"
        :visible.sync="dialog.visible"
        :close-on-click-modal="false"
      >
        <el-form
          ref="dataForm"
          :rules="dialog.rules"
          :model="dialog.data"
          :disabled="dialog.disabled"
          label-position="left"
          label-width="100px"
          style="max-width: 400px; margin-left: 50px"
        >
          <el-form-item label="菜单名称" prop="menuName">
            <el-input v-model="dialog.data.menuName" clearable placeholder="" />
          </el-form-item>
          <el-form-item label="父级菜单">
            <el-cascader
              v-model="dialog.data.parentId"
              :options="tableData"
              clearable
              :props="{
                checkStrictly: dialog.checkStrictly,
                label: 'menuName',
                value: 'id',
              }"
            />
          </el-form-item>
          <el-form-item label="排序">
            <el-input
              v-model="dialog.data.sort"
              type="number"
              clearable
              placeholder=""
            />
          </el-form-item>
          <el-form-item label="类型" prop="menuType">
            <el-radio-group v-model="dialog.data.menuType">
              <el-radio :label="1">菜单</el-radio>
              <el-radio :label="2">页面</el-radio>
              <el-radio :label="3">按钮</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="路径">
            <el-input v-model="dialog.data.url" clearable placeholder="" />
          </el-form-item>
          <el-form-item label="操作代码" prop="resourceCode">
            <el-input
              v-model="dialog.data.resourceCode"
              clearable
              placeholder=""
            />
          </el-form-item>
          <el-form-item label="是否锁定">
            <el-switch v-model="dialog.data.isLocked" />
          </el-form-item>
          <el-form-item label="是否显示">
            <el-switch v-model="dialog.data.visible" />
          </el-form-item>
          <el-form-item label="图标">
            <i v-if="dialog.data.icon" :class="'fa ' + dialog.data.icon" />
            <el-button
              plain
              style="margin-left: 15px"
              @click="dialogIcon.visible = true"
              >选择图标</el-button
            >
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialog.visible = false">取 消</el-button>
          <el-button
            :loading="dialog.updateLoading"
            :disabled="dialog.disabled"
            type="primary"
            @click="updateData"
            >确 认
          </el-button>
        </div>
      </el-dialog>
      <!--选择图标-->
      <el-dialog title="图标列表" :visible.sync="dialogIcon.visible">
        <div class="menu-icons-grid">
          <div
            v-for="(item, index) in dialogIcon.elementIcons"
            :key="`${item}-${index}`"
            class="menu-icon-item"
            @click="pickIcon(item)"
          >
            <i :class="'fa ' + item" />
            <span>{{ item }}</span>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  createOrUpdateMenu,
  getMenus,
  deleteMenu,
  getAllMenus,
  getFullMenus,
} from "@/api/menu";
import { isHaveToken } from "@/utils/auth";
export default {
  name: "Index",
  data() {
    var validateCode = (rule, value, callback) => {
      if (this.dialog.data.menuType === 3) {
        if (!value) {
          callback(new Error("当类型是按钮类型时此项必填"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    return {
      // 表格数据
      tableData: [],
      dialog: {
        title: "新增菜单",
        visible: false,
        data: {
          id: "",
          menuName: "",
          parentId: [],
          url: "",
          icon: "",
          sort: "",
          visible: true,
          resourceCode: "",
          isLocked: false,
          menuType: "",
        },
        rules: {
          menuName: [
            { required: true, message: "菜单名称为必填项", trigger: "blur" },
          ],
          menuType: [
            { required: true, message: "类型为必选项", trigger: "blur" },
          ],
          resourceCode: [{ validator: validateCode, trigger: "blur" }],
        },
        updateLoading: false,
        disabled: false,
        checkStrictly: true, // 是否严格的遵守父子节点不互相关联
      },
      dialogIcon: {
        visible: false,
        elementIcons: [
          "fa-adjust",
          "fa-anchor",
          "fa-archive",
          "fa-area-chart",
          "fa-arrows",
          "fa-arrows-h",
          "fa-arrows-v",
          "fa-asterisk",
          "fa-at",
          "fa-automobile",
          "fa-ban",
          "fa-bank",
          "fa-bar-chart",
          "fa-bar-chart-o",
          "fa-barcode",
          "fa-bars",
          "fa-beer",
          "fa-bell",
          "fa-bell-o",
          "fa-bell-slash",
          "fa-bell-slash-o",
          "fa-bicycle",
          "fa-binoculars",
          "fa-birthday-cake",
          "fa-bolt",
          "fa-bomb",
          "fa-book",
          "fa-bookmark",
          "fa-bookmark-o",
          "fa-briefcase",
          "fa-bug",
          "fa-building",
          "fa-building-o",
          "fa-bullhorn",
          "fa-bullseye",
          "fa-bus",
          "fa-cab",
          "fa-calculator",
          "fa-calendar",
          "fa-calendar-o",
          "fa-camera",
          "fa-camera-retro",
          "fa-car",
          "fa-caret-square-o-down",
          "fa-caret-square-o-left",
          "fa-caret-square-o-right",
          "fa-caret-square-o-up",
          "fa-cc",
          "fa-certificate",
          "fa-check",
          "fa-check-circle",
          "fa-check-circle-o",
          "fa-check-square",
          "fa-check-square-o",
          "fa-child",
          "fa-circle",
          "fa-circle-o",
          "fa-circle-o-notch",
          "fa-circle-thin",
          "fa-clock-o",
          "fa-close",
          "fa-cloud",
          "fa-cloud-download",
          "fa-cloud-upload",
          "fa-code",
          "fa-code-fork",
          "fa-coffee",
          "fa-cog",
          "fa-cogs",
          "fa-comment",
          "fa-comment-o",
          "fa-comments",
          "fa-comments-o",
          "fa-compass",
          "fa-copyright",
          "fa-credit-card",
          "fa-crop",
          "fa-crosshairs",
          "fa-cube",
          "fa-cubes",
          "fa-cutlery",
          "fa-dashboard",
          "fa-database",
          "fa-desktop",
          "fa-dot-circle-o",
          "fa-download",
          "fa-edit",
          "fa-ellipsis-h",
          "fa-ellipsis-v",
          "fa-envelope",
          "fa-envelope-o",
          "fa-envelope-square",
          "fa-eraser",
          "fa-exchange",
          "fa-exclamation",
          "fa-exclamation-circle",
          "fa-exclamation-triangle",
          "fa-external-link",
          "fa-external-link-square",
          "fa-eye",
          "fa-eye-slash",
          "fa-eyedropper",
          "fa-fax",
          "fa-female",
          "fa-fighter-jet",
          "fa-file-archive-o",
          "fa-file-audio-o",
          "fa-file-code-o",
          "fa-file-excel-o",
          "fa-file-image-o",
          "fa-file-movie-o",
          "fa-file-pdf-o",
          "fa-file-photo-o",
          "fa-file-picture-o",
          "fa-file-powerpoint-o",
          "fa-file-sound-o",
          "fa-file-video-o",
          "fa-file-word-o",
          "fa-file-zip-o",
          "fa-film",
          "fa-filter",
          "fa-fire",
          "fa-fire-extinguisher",
          "fa-flag",
          "fa-flag-checkered",
          "fa-flag-o",
          "fa-flash",
          "fa-flask",
          "fa-folder",
          "fa-folder-o",
          "fa-folder-open",
          "fa-folder-open-o",
          "fa-frown-o",
          "fa-futbol-o",
          "fa-gamepad",
          "fa-gavel",
          "fa-gear",
          "fa-gears",
          "fa-gift",
          "fa-glass",
          "fa-globe",
          "fa-graduation-cap",
          "fa-group",
          "fa-hdd-o",
          "fa-headphones",
          "fa-heart",
          "fa-heart-o",
          "fa-history",
          "fa-home",
          "fa-image",
          "fa-inbox",
          "fa-info",
          "fa-info-circle",
          "fa-institution",
          "fa-key",
          "fa-keyboard-o",
          "fa-language",
          "fa-laptop",
          "fa-leaf",
          "fa-legal",
          "fa-lemon-o",
          "fa-level-down",
          "fa-level-up",
          "fa-life-bouy",
          "fa-life-buoy",
          "fa-life-ring",
          "fa-life-saver",
          "fa-lightbulb-o",
          "fa-line-chart",
          "fa-location-arrow",
          "fa-lock",
          "fa-magic",
          "fa-magnet",
          "fa-mail-forward",
          "fa-mail-reply",
          "fa-mail-reply-all",
          "fa-male",
          "fa-map-marker",
          "fa-meh-o",
          "fa-microphone",
          "fa-microphone-slash",
          "fa-minus",
          "fa-minus-circle",
          "fa-minus-square",
          "fa-minus-square-o",
          "fa-mobile",
          "fa-mobile-phone",
          "fa-money",
          "fa-moon-o",
          "fa-mortar-board",
          "fa-music",
          "fa-navicon",
          "fa-newspaper-o",
          "fa-paint-brush",
          "fa-paper-plane",
          "fa-paper-plane-o",
          "fa-paw",
          "fa-pencil",
          "fa-pencil-square",
          "fa-pencil-square-o",
          "fa-phone",
          "fa-phone-square",
          "fa-photo",
          "fa-picture-o",
          "fa-pie-chart",
          "fa-plane",
          "fa-plug",
          "fa-plus",
          "fa-plus-circle",
          "fa-plus-square",
          "fa-plus-square-o",
          "fa-power-off",
          "fa-print",
          "fa-puzzle-piece",
          "fa-qrcode",
          "fa-question",
          "fa-question-circle",
          "fa-quote-left",
          "fa-quote-right",
          "fa-random",
          "fa-recycle",
          "fa-refresh",
          "fa-remove",
          "fa-reorder",
          "fa-reply",
          "fa-reply-all",
          "fa-retweet",
          "fa-road",
          "fa-rocket",
          "fa-rss",
          "fa-rss-square",
          "fa-search",
          "fa-search-minus",
          "fa-search-plus",
          "fa-send",
          "fa-send-o",
          "fa-share",
          "fa-share-alt",
          "fa-share-alt-square",
          "fa-share-square",
          "fa-share-square-o",
          "fa-shield",
          "fa-shopping-cart",
          "fa-sign-in",
          "fa-sign-out",
          "fa-signal",
          "fa-sitemap",
          "fa-sliders",
          "fa-smile-o",
          "fa-soccer-ball-o",
          "fa-sort",
          "fa-sort-alpha-asc",
          "fa-sort-alpha-desc",
          "fa-sort-amount-asc",
          "fa-sort-amount-desc",
          "fa-sort-asc",
          "fa-sort-desc",
          "fa-sort-down",
          "fa-sort-numeric-asc",
          "fa-sort-numeric-desc",
          "fa-sort-up",
          "fa-space-shuttle",
          "fa-spinner",
          "fa-spoon",
          "fa-square",
          "fa-square-o",
          "fa-star",
          "fa-star-half",
          "fa-star-half-empty",
          "fa-star-half-full",
          "fa-star-half-o",
          "fa-star-o",
          "fa-suitcase",
          "fa-sun-o",
          "fa-support",
          "fa-tablet",
          "fa-tachometer",
          "fa-tag",
          "fa-tags",
          "fa-tasks",
          "fa-taxi",
          "fa-terminal",
          "fa-thumb-tack",
          "fa-thumbs-down",
          "fa-thumbs-o-down",
          "fa-thumbs-o-up",
          "fa-thumbs-up",
          "fa-ticket",
          "fa-times",
          "fa-times-circle",
          "fa-times-circle-o",
          "fa-tint",
          "fa-toggle-down",
          "fa-toggle-left",
          "fa-toggle-off",
          "fa-toggle-on",
          "fa-toggle-right",
          "fa-toggle-up",
          "fa-trash",
          "fa-trash-o",
          "fa-tree",
          "fa-trophy",
          "fa-truck",
          "fa-tty",
          "fa-umbrella",
          "fa-university",
          "fa-unlock",
          "fa-unlock-alt",
          "fa-unsorted",
          "fa-upload",
          "fa-user",
          "fa-users",
          "fa-video-camera",
          "fa-volume-down",
          "fa-volume-off",
          "fa-volume-up",
          "fa-warning",
          "fa-wheelchair",
          "fa-wifi",
          "fa-wrench",
          "fa-file",
          "fa-file-archive-o",
          "fa-file-audio-o",
          "fa-file-code-o",
          "fa-file-excel-o",
          "fa-file-image-o",
          "fa-file-movie-o",
          "fa-file-o",
          "fa-file-pdf-o",
          "fa-file-photo-o",
          "fa-file-picture-o",
          "fa-file-powerpoint-o",
          "fa-file-sound-o",
          "fa-file-text",
          "fa-file-text-o",
          "fa-file-video-o",
          "fa-file-word-o",
          "fa-file-zip-o",
          "fa-circle-o-notch",
          "fa-cog",
          "fa-gear",
          "fa-refresh",
          "fa-spinner",
          "fa-check-square",
          "fa-check-square-o",
          "fa-circle",
          "fa-circle-o",
          "fa-dot-circle-o",
          "fa-minus-square",
          "fa-minus-square-o",
          "fa-plus-square",
          "fa-plus-square-o",
          "fa-square",
          "fa-square-o",
          "fa-cc-amex",
          "fa-cc-discover",
          "fa-cc-mastercard",
          "fa-cc-paypal",
          "fa-cc-stripe",
          "fa-cc-visa",
          "fa-credit-card",
          "fa-google-wallet",
          "fa-paypal",
          "fa-area-chart",
          "fa-bar-chart",
          "fa-bar-chart-o",
          "fa-line-chart",
          "fa-pie-chart",
          "fa-bitcoin",
          "fa-btc",
          "fa-cny",
          "fa-dollar",
          "fa-eur",
          "fa-euro",
          "fa-gbp",
          "fa-ils",
          "fa-inr",
          "fa-jpy",
          "fa-krw",
          "fa-money",
          "fa-rmb",
          "fa-rouble",
          "fa-rub",
          "fa-ruble",
          "fa-rupee",
          "fa-shekel",
          "fa-sheqel",
          "fa-try",
          "fa-turkish-lira",
          "fa-usd",
          "fa-won",
          "fa-yen",
          "fa-align-center",
          "fa-align-justify",
          "fa-align-left",
          "fa-align-right",
          "fa-bold",
          "fa-chain",
          "fa-chain-broken",
          "fa-clipboard",
          "fa-columns",
          "fa-copy",
          "fa-cut",
          "fa-dedent",
          "fa-eraser",
          "fa-file",
          "fa-file-o",
          "fa-file-text",
          "fa-file-text-o",
          "fa-files-o",
          "fa-floppy-o",
          "fa-font",
          "fa-header",
          "fa-indent",
          "fa-italic",
          "fa-link",
          "fa-list",
          "fa-list-alt",
          "fa-list-ol",
          "fa-list-ul",
          "fa-outdent",
          "fa-paperclip",
          "fa-paragraph",
          "fa-paste",
          "fa-repeat",
          "fa-rotate-left",
          "fa-rotate-right",
          "fa-save",
          "fa-scissors",
          "fa-strikethrough",
          "fa-subscript",
          "fa-superscript",
          "fa-table",
          "fa-text-height",
          "fa-text-width",
          "fa-th",
          "fa-th-large",
          "fa-th-list",
          "fa-underline",
          "fa-undo",
          "fa-unlink",
          "fa-angle-double-down",
          "fa-angle-double-left",
          "fa-angle-double-right",
          "fa-angle-double-up",
          "fa-angle-down",
          "fa-angle-left",
          "fa-angle-right",
          "fa-angle-up",
          "fa-arrow-circle-down",
          "fa-arrow-circle-left",
          "fa-arrow-circle-o-down",
          "fa-arrow-circle-o-left",
          "fa-arrow-circle-o-right",
          "fa-arrow-circle-o-up",
          "fa-arrow-circle-right",
          "fa-arrow-circle-up",
          "fa-arrow-down",
          "fa-arrow-left",
          "fa-arrow-right",
          "fa-arrow-up",
          "fa-arrows",
          "fa-arrows-alt",
          "fa-arrows-h",
          "fa-arrows-v",
          "fa-caret-down",
          "fa-caret-left",
          "fa-caret-right",
          "fa-caret-square-o-down",
          "fa-caret-square-o-left",
          "fa-caret-square-o-right",
          "fa-caret-square-o-up",
          "fa-caret-up",
          "fa-chevron-circle-down",
          "fa-chevron-circle-left",
          "fa-chevron-circle-right",
          "fa-chevron-circle-up",
          "fa-chevron-down",
          "fa-chevron-left",
          "fa-chevron-right",
          "fa-chevron-up",
          "fa-hand-o-down",
          "fa-hand-o-left",
          "fa-hand-o-right",
          "fa-hand-o-up",
          "fa-long-arrow-down",
          "fa-long-arrow-left",
          "fa-long-arrow-right",
          "fa-long-arrow-up",
          "fa-toggle-down",
          "fa-toggle-left",
          "fa-toggle-right",
          "fa-toggle-up",
          "fa-arrows-alt",
          "fa-backward",
          "fa-compress",
          "fa-eject",
          "fa-expand",
          "fa-fast-backward",
          "fa-fast-forward",
          "fa-forward",
          "fa-pause",
          "fa-play",
          "fa-play-circle",
          "fa-play-circle-o",
          "fa-step-backward",
          "fa-step-forward",
          "fa-stop",
          "fa-youtube-play",
          "fa-adn",
          "fa-android",
          "fa-angellist",
          "fa-apple",
          "fa-behance",
          "fa-behance-square",
          "fa-bitbucket",
          "fa-bitbucket-square",
          "fa-bitcoin",
          "fa-btc",
          "fa-cc-amex",
          "fa-cc-discover",
          "fa-cc-mastercard",
          "fa-cc-paypal",
          "fa-cc-stripe",
          "fa-cc-visa",
          "fa-codepen",
          "fa-css3",
          "fa-delicious",
          "fa-deviantart",
          "fa-digg",
          "fa-dribbble",
          "fa-dropbox",
          "fa-drupal",
          "fa-empire",
          "fa-facebook",
          "fa-facebook-square",
          "fa-flickr",
          "fa-foursquare",
          "fa-ge",
          "fa-git",
          "fa-git-square",
          "fa-github",
          "fa-github-alt",
          "fa-github-square",
          "fa-gittip",
          "fa-google",
          "fa-google-plus",
          "fa-google-plus-square",
          "fa-google-wallet",
          "fa-hacker-news",
          "fa-html5",
          "fa-instagram",
          "fa-ioxhost",
          "fa-joomla",
          "fa-jsfiddle",
          "fa-lastfm",
          "fa-lastfm-square",
          "fa-linkedin",
          "fa-linkedin-square",
          "fa-linux",
          "fa-maxcdn",
          "fa-meanpath",
          "fa-openid",
          "fa-pagelines",
          "fa-paypal",
          "fa-pied-piper",
          "fa-pied-piper-alt",
          "fa-pinterest",
          "fa-pinterest-square",
          "fa-qq",
          "fa-ra",
          "fa-rebel",
          "fa-reddit",
          "fa-reddit-square",
          "fa-renren",
          "fa-share-alt",
          "fa-share-alt-square",
          "fa-skype",
          "fa-slack",
          "fa-slideshare",
          "fa-soundcloud",
          "fa-spotify",
          "fa-stack-exchange",
          "fa-stack-overflow",
          "fa-steam",
          "fa-steam-square",
          "fa-stumbleupon",
          "fa-stumbleupon-circle",
          "fa-tencent-weibo",
          "fa-trello",
          "fa-tumblr",
          "fa-tumblr-square",
          "fa-twitch",
          "fa-twitter",
          "fa-twitter-square",
          "fa-vimeo-square",
          "fa-vine",
          "fa-vk",
          "fa-wechat",
          "fa-weibo",
          "fa-weixin",
          "fa-windows",
          "fa-wordpress",
          "fa-xing",
          "fa-xing-square",
          "fa-yahoo",
          "fa-yelp",
          "fa-youtube",
          "fa-youtube-play",
          "fa-youtube-square",
          "fa-ambulance",
          "fa-h-square",
          "fa-hospital-o",
          "fa-medkit",
          "fa-plus-square",
          "fa-stethoscope",
          "fa-user-md",
          "fa-wheelchair",
        ],
      },
    };
  },
  watch: {
    "dialog.visible"(val, old) {
      // 关闭dialog，清空
      if (!val) {
        this.dialog.data = {
          id: "",
          menuName: "",
          parentId: [],
          url: "",
          icon: "",
          sort: "",
          visible: false,
          resourceCode: "",
          isLocked: false,
          menuType: "",
        };
        this.dialog.updateLoading = false;
        this.dialog.disabled = false;
      }
    },
  },
  created() {
    this.getList();
    isHaveToken();
  },
  methods: {
    // 选取图标
    pickIcon(item) {
      this.dialogIcon.visible = false;
      this.dialog.data.icon = item;
    },
    // 获取所有菜单
    async getList() {
      const a = await getFullMenus();
      if (a.success) {
        const b = a.data || [];
        const allMenu = [];
        this.menuFormat(b, null, allMenu);
        this.tableData = allMenu;
        return;
      }
      this.$message.error("获取菜单信息失败");

      // const menusList = await getAllMenus({ hasButton: true })
      // const allMenu = menusList.data.items
      // this.menuDeWeight(allMenu)
      // console.log('menuDeWeight', allMenu)
      // await this.getMenuInfo(allMenu)
      // console.log('getMenuInfo', allMenu)
      // this.$nextTick(() => {
      //   console.log('1111111', allMenu)
      //   this.tableData = allMenu
      // })
      // this.ddd(b, null, allMenu)
      // this.tableData = allMenu
    },
    // 数据处理
    menuFormat(source, parentId, dest) {
      var array = source.filter((_) => _.parentId === parentId);
      for (var i in array) {
        var ele = array[i];
        ele.children = [];
        dest.unshift(ele);
        this.menuFormat(source, ele.id, ele.children);
      }
    },
    // 编辑 // 新增菜单 // 增加下一级
    handleEdit(index, row, flag) {
      this.dialog.visible = true;
      if (flag === "add") {
        // 新增
        this.dialog.title = "新增菜单";
        return;
      }
      // 编辑
      const {
        id,
        menuName,
        parentId,
        url,
        icon,
        sort,
        visible,
        resourceCode,
        isLocked,
        menuType,
      } = row;
      this.dialog.data = {
        id,
        menuName,
        parentId: [parentId],
        url,
        icon,
        sort,
        visible,
        resourceCode,
        isLocked,
        menuType,
      };
      // dialog中父级菜单 做递归显示
      const x = [];
      this.recursionFunc(row, this.tableData, x);
      this.dialog.data.parentId = x;
      // ////////////////////////////

      if (flag === "edit") {
        this.dialog.title = "编辑菜单";
        if (row.isLocked) {
          this.dialog.disabled = true;
        }
      } else if (flag === "addNext") {
        this.dialog.data.id = "";
        this.dialog.title = "增加下一级菜单";
        this.dialog.data.menuName = "";
        this.dialog.data.parentId.push(row.id);
      }
    },
    // 设置父级菜单默认显示 递归
    recursionFunc(row, source, dest) {
      if (row.parentId === null) {
        return;
      }
      for (const i in source) {
        const ele = source[i];
        if (row.parentId === ele.id) {
          this.recursionFunc(ele, this.tableData, dest);
          dest.push(ele.id);
        } else {
          this.recursionFunc(row, ele.children, dest);
        }
      }
    },
    // 更新新增、编辑
    updateData() {
      this.$refs["dataForm"].validate((valid) => {
        // 表单校验
        if (valid) {
          this.dialog.updateLoading = true;
          const data = {
            Id: this.dialog.data.id,
            MenuName: this.dialog.data.menuName,
            ParentId:
              this.dialog.data.parentId[this.dialog.data.parentId.length - 1],
            Url: this.dialog.data.url,
            Icon: "fa " + this.dialog.data.icon,
            Sort: this.dialog.data.sort * 1,
            Visible: this.dialog.data.visible,
            ResourceCode: this.dialog.data.resourceCode,
            IsLocked: this.dialog.data.isLocked,
            MenuType: this.dialog.data.menuType,
          };
          createOrUpdateMenu(data)
            .then((res) => {
              if (res.success) {
                this.$notify({
                  title: "Success",
                  message: "成功",
                  type: "success",
                  duration: 2000,
                });
                this.getList();
                this.dialog.visible = false;
              }
            })
            .catch(() => {
              this.dialog.updateLoading = false;
            });
        }
      });
    },
    // 删除
    handleDelete(index, row) {
      if (!row.id) return;
      deleteMenu(row.id).then((res) => {
        if (res.success) {
          this.$notify({
            title: "Success",
            message: "删除成功",
            type: "success",
            duration: 2000,
          });
          this.getList();
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.menu-icon-item {
  cursor: pointer;
}
</style>
