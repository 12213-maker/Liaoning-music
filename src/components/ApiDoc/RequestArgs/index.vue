<template class="hide">
  <div
    :class="{ 'div-editing-table': editing, 'request-args': true }"
    :data-pid="pid"
    :data-module-name="name"
  >
    <div
      class="div-table-line"
      :class="{ 'div-editing-line': editing }"
      v-for="(item, index) in requestArgs"
      :key="index"
      :data-id="item.id"
    >
      <div v-if="editing">
        <ul class="cb">
          <li class="col-sm-1">
            <i
              class="iconfont icon-close"
              @click="removeRow(item, requestArgs)"
            ></i>
            <i
              class="iconfont icon-tianjia"
              v-show="item.type && item.type.indexOf('object') != -1"
              @click="insertRow(item, 'requestArgs')"
            ></i>
            <i
              class="iconfont icon-drag-copy"
              @dragstart="dragstart(requestArgs, item)"
            ></i>
          </li>
          <li class="col-sm-3 input">
            <input
              type="text"
              list="requestlist"
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
          <li class="col-sm-2">
            <select v-model="item.type">
              <option value="string">string</option>
              <option value="number">number</option>
              <option value="boolean">boolean</option>
              <option value="object">object</option>
              <option value="array">array</option>
              <option value="array[number]">array[number]</option>
              <option value="array[boolean]">array[boolean]</option>
              <option value="array[string]">array[string]</option>
              <option value="array[object]">array[object]</option>
              <option value="array[array]">array[array]</option>
              <option value="file">file</option>
            </select>
          </li>
          <li class="col-sm-2 input">
            <input type="text" class="text" v-model="item.defaultValue" />
          </li>
          <li class="col-sm-2 input">
            <input type="text" class="text" v-model="item.description" />
          </li>
        </ul>
      </div>
      <div v-else>
        <ul class="cb">
          <li class="col-sm-2 name">
            <div v-if="item.type && item.type.indexOf('object') != -1">
              <i
                class="iconfont icon-my open"
                @click="apiArgsColumnFold($event)"
              ></i>
            </div>
            <div class="w-block">
              <div class="w-item">{{ item.name }}</div>
            </div>
          </li>
          <li class="col-sm-1">{{ item.require || "false" }}</li>
          <li class="col-sm-1" :title="item.type">{{ item.type }}</li>
          <li class="col-sm-2" :title="item.defaultValue">
            {{ item.defaultValue }}
          </li>
          <li class="col-sm-6 full-height" :title="item.description">
            <div class="w-block">
              <div class="w-item">{{ item.description }}</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="sub">
        <request-args-vue
          :requestArgs="item.children"
          :name="name"
          :editing="editing"
        ></request-args-vue>
      </div>
    </div>
  </div>
</template>

<script>
/* requirejs(['vue','/assets/js/table.js'],function(Vue,table){
        table = $.extend(true,{},table);
        table.template=document.getElementById('request-args-template').innerHTML;
        table.props=['requestArgs','editing','name', 'pid'];
        Vue.component('RequestArgsVue',table);
    }); */

import table from "@/assets/js/table.js";
import RequestArgsVue from "@/components/ApiDoc/RequestArgs/index";
export default {
  name: "RequestArgsVue",
  mixins: [table],
  components: {
    RequestArgsVue,
  },
  props: ["requestArgs", "editing", "name", "pid"]
};
</script>

