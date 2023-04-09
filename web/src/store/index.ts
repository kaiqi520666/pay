// stores/counter.js
import { defineStore } from "pinia";

export const useStore = defineStore("counter", {
  state: () => {
    return { order_id: "", user_id: "" };
  },
  // 也可以定义为
  // state: () => ({ count: 0 })
});
