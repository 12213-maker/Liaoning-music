<template class="hide">
  <div
    :class="{ 'div-editing-table': editing, 'response-headers': true }"
    class="placeholder-response-headers"
    :data-pid="pid"
    :data-module-name="name"
  >
    <div
      class="div-table-line"
      :class="{ 'div-editing-line': editing }"
      v-for="item in responseHeaders"
      :key="item.id"
      :data-id="item.id"
    >
      <div v-if="editing">
        <ul class="cb">
          <li class="col-sm-1">
            <i
              class="iconfont icon-close"
              @click="removeRow(item, responseHeaders)"
            ></i>
            <i
              class="iconfont icon-drag-copy"
              @dragstart="dragstart(responseHeaders, item)"
            ></i>
          </li>
          <li class="col-sm-3 input">
            <input
              type="text"
              list="headerlist"
              class="text name"
              v-model="item.name"
            />
          </li>
          <li class="col-sm-2">
            <select v-model="item.require">
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
          </li>
          <li class="col-sm-6 input">
            <input type="text" class="text" v-model="item.description" />
          </li>
        </ul>
      </div>
      <div v-else>
        <ul class="cb">
          <li class="col-sm-2 name">
            <template
              v-if="
                item.type &&
                (item.type == 'object' || item.type.indexOf('array') != -1)
              "
            >
              <i
                class="iconfont icon-my open"
                @click="apiArgsColumnFold($event)"
              ></i>
            </template>
            <div class="w-block">
              <div class="w-item">{{ item.name }}</div>
            </div>
          </li>
          <li class="col-sm-1">{{ item.require || "false" }}</li>
          <li class="col-sm-9 full-height" :title="item.description">
            <div class="w-block">
              <div class="w-item">{{ item.description }}</div>
            </div>
          </li>
        </ul>
      </div>

      <div class="sub">
        <response-headers-vue
          :request-headers.sync="item.children"
          :editing="editing"
        ></response-headers-vue>
      </div>
    </div>
  </div>
</template>
<script>
/* requirejs(['vue', '${ctx}/proxy/${pluginInfo.id}/assets/js/table.js?v=${pluginInfo.version}'], function (Vue, table) {
        table = $.extend(true, {}, table);
        table.template = document.getElementById('response-headers-template').innerHTML;
        table.props = ['responseHeaders', 'editing', 'name', 'pid'];
        Vue.component('ResponseHeadersVue', table);
    }); */
import table from "@/assets/js/table.js";
import ResponseHeadersVue from "@/components/ApiDoc/ResponseHeaders/index";
export default {
  name: "ResponseHeadersVue",
  components: {
    ResponseHeadersVue,
  },
  mixins: [table],
  props: ["responseHeaders", "editing", "name", "pid"],
};
</script>
