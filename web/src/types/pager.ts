import { ref } from 'vue';
import { Global } from '@/global';

export const Pager = ref({
  page: 1,
  count: 0,
  size: Global.LIMIT
});
