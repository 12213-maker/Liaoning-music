<template class="hide">
  <div
    :class="{ 'div-editing-table': editing, 'request-headers': true }"
    class="placeholder-request-headers"
    :data-pid="pid"
    :data-module-name="name"
  >
    <div
      class="div-table-line"
      :class="{ 'div-editing-line': editing }"
      v-for="(item, index) in requestHeaders"
      :key="index"
      :data-id="item.id"
    >
      <div v-if="editing">
        <ul class="cb">
          <li class="col-sm-1">
            <i
              class="iconfont icon-close"
              @click="removeRow(item, requestHeaders)"
            ></i>
            <i
              class="iconfont icon-drag-copy"
              @dragstart="dragstart(requestHeaders, item)"
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
          <li class="col-sm-2 input">
            <input type="text" class="text" v-model="item.defaultValue" />
          </li>
          <li class="col-sm-4 input">
            <input type="text" class="text" v-model="item.description" />
          </li>
        </ul>
      </div>
      <div v-else>
        <ul class="cb">
          <li class="col-sm-2 name full-height">
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
          <li class="col-sm-1">&nbsp;{{ item.require || "false" }}</li>
          <li class="col-sm-2" :title="item.defaultValue">
            <div class="w-block">
              <div class="w-item">{{ item.defaultValue }}</div>
            </div>
          </li>
          <li class="col-sm-7 full-height" :title="item.description">
            <div class="w-block">
              <div class="w-item">{{ item.description }}</div>
            </div>
          </li>
        </ul>
      </div>

      <div class="sub">
        <request-headers-vue
          :request-headers.sync="item.children"
          :editing="editing"
        ></request-headers-vue>
      </div>
    </div>
  </div>
</template>

<script>
/* requirejs(['vue','${ctx}/proxy/${pluginInfo.id}/assets/js/table.js?v=${pluginInfo.version}'],function(Vue,table){
        table = $.extend(true,{},table);
        table.template=document.getElementById('request-headers-template').innerHTML;
        table.props=['requestHeaders','editing','name','pid'];
        Vue.component('RequestHeadersVue',table);
    }); */
import table from "@/assets/js/table.js";
import RequestHeadersVue from "@/components/ApiDoc/RequestHeaders/index";
export default {
  name: "RequestHeadersVue",
  components: {
    RequestHeadersVue,
  },
  mixins: [table],
  props: ["requestHeaders", "editing", "name", "pid"]
};
</script>
