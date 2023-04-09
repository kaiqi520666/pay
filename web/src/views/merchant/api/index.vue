<template>
  <el-scrollbar>
    <p class="title_1 mb10">1. 协议规则</p>
    <el-descriptions border :column="2">
      <el-descriptions-item label="传输方式">采用HTTP传输</el-descriptions-item>
      <el-descriptions-item label="提交方式"
        >POST Content-Type=application/json
      </el-descriptions-item>
      <el-descriptions-item label="回调方式">GET 字符编码：UTF-8 </el-descriptions-item>
      <el-descriptions-item label="签名算法">
        <el-tag size="small">MD5</el-tag>
      </el-descriptions-item>
    </el-descriptions>
    <el-divider />
    <p class="title_1 mb10">2. 参数规范</p>
    <el-descriptions border>
      <el-descriptions-item label="交易金额">默认为人民币交易，单位为元。 </el-descriptions-item>
    </el-descriptions>
    <el-divider />
    <p class="title_1 mb10">3. 安全规范</p>
    <p class="mb10">
      第一步：设所有发送或者接收到的数据为集合M，使用URL键值对的格式（即key1=value1&key2=value2…）拼接成字符串stringA。
    </p>
    <p class="mb10">
      第二步：在stringA最后拼接上
      <el-tag>secret_key</el-tag>
      得到stringSignTemp字符串，并对stringSignTemp进行MD5运算，再将得到的字符串所有字符转换为大写，得到sign值signValue。
    </p>
    <el-descriptions :column="1" border class="mb10">
      <el-descriptions-item label="待签名值"
        >{{
          `merchant_id=6001045&out_order_id=P12312321123&channel=9900&amount=100&${''}notify_url=http://www.baidu.com&extra=100&secret_key=owep0945908lskdj823wefk`
        }}
      </el-descriptions-item>
      <el-descriptions-item label="签名结果"
        >5E0AA05DD4BB4FE5AB65608123EBA591
      </el-descriptions-item>
      <el-descriptions-item label="最终参数"
        >{{
          `merchant_id=6001045&out_order_id=P12312321123&channel=9900&amount=100&${''}notify_url=http://www.baidu.com&extra=100&sign=5E0AA05DD4BB4FE5AB65608123EBA591`
        }}
      </el-descriptions-item>
    </el-descriptions>
    <custom_title>
      商户登录商户系统后，通过商户管理
      <el-button link @click="onClick" type="primary">基本信息</el-button>
      查看或修改私钥
      <el-tag>secret_key</el-tag>
    </custom_title>
    <el-divider />
    <p class="title_1 mb10">4. 统一下单</p>
    <custom_title>接口描述</custom_title>
    <p class="mb10">商户通过该接口查询支付订单结果，并根据状态结果进一步处理业务逻辑。</p>
    <custom_title> 接口链接</custom_title>
    <p class="mb10">
      URL地址：
      <el-tag>https://pay.hotkid.me/order/create</el-tag>
    </p>
    <custom_title> 请求参数</custom_title>
    <el-table :data="table_1" border class="mb10">
      <el-table-column label="字段名" prop="fieldName"></el-table-column>
      <el-table-column label="变量名" prop="variableName"></el-table-column>
      <el-table-column label="必填" prop="required"></el-table-column>
      <el-table-column label="类型" prop="type"></el-table-column>
      <el-table-column label="示例值" width="300" prop="example"></el-table-column>
      <el-table-column label="描述" prop="describe" width="300"></el-table-column>
    </el-table>
    <custom_title> 返回结果</custom_title>
    <el-table :data="table_2" border>
      <el-table-column label="字段名" prop="fieldName"></el-table-column>
      <el-table-column label="变量名" prop="variableName"></el-table-column>
      <el-table-column label="必填" prop="required"></el-table-column>
      <el-table-column label="类型" prop="type"></el-table-column>
      <el-table-column label="示例值" width="400" prop="example"></el-table-column>
      <el-table-column label="描述" prop="describe" width="300"></el-table-column>
    </el-table>
    <el-divider />
    <p class="title_1 mb10">5. 查询订单</p>
    <custom_title> 接口描述</custom_title>
    <p class="mb10">
      业务通过统一下单接口可以发起任意三方支付渠道的支付订单。业务系统不必关心该如何调用三方支付，统一下单接口会根据业务系统选择的支付渠道ID，选择对应支付渠道的支付产品，发起下单请求，然后响应给业务系统支付请求所需参数。
    </p>
    <custom_title> 接口链接</custom_title>
    <p class="mb10">
      URL地址：
      <el-tag>https://pay.hotkid.me/order/create</el-tag>
    </p>
    <custom_title> 请求参数</custom_title>
    <el-table :data="table_3" border class="mb10">
      <el-table-column label="字段名" prop="fieldName"></el-table-column>
      <el-table-column label="变量名" prop="variableName"></el-table-column>
      <el-table-column label="必填" prop="required"></el-table-column>
      <el-table-column label="类型" prop="type"></el-table-column>
      <el-table-column label="示例值" width="300" prop="example"></el-table-column>
      <el-table-column label="描述" prop="describe" width="300"></el-table-column>
    </el-table>
    <custom_title> 返回结果</custom_title>
    <el-table :data="table_4" border>
      <el-table-column label="字段名" prop="fieldName"></el-table-column>
      <el-table-column label="变量名" prop="variableName"></el-table-column>
      <el-table-column label="必填" prop="required"></el-table-column>
      <el-table-column label="类型" prop="type"></el-table-column>
      <el-table-column label="示例值" width="400" prop="example"></el-table-column>
      <el-table-column label="描述" prop="describe" width="300"></el-table-column>
    </el-table>
    <el-divider />
    <p class="title_1 mb10">6. 结果通知</p>
    <custom_title> 接口描述</custom_title>
    <p class="mb10">
      当支付处理完成后，支付系统会通过该接口向商户发起支付结果通知。
      <el-tag type="danger">通知以GET方式发送 </el-tag>
    </p>
    <custom_title> 接口链接</custom_title>
    <p class="mb10">
      该链接是通过统一下单接口提交的参数notifyUrl设置，如果无法访问链接，业务系统将无法接收到支付中心的通知。
    </p>
    <p class="mb10" style="color: red">
      注意：回调所携带的所有参数必须先判断是否为空，只有不为空的参数才参与签名
    </p>
    <custom_title> 请求参数</custom_title>
    <el-table :data="table_5" border class="mb10">
      <el-table-column label="字段名" prop="fieldName"></el-table-column>
      <el-table-column label="变量名" prop="variableName"></el-table-column>
      <el-table-column label="必填" prop="required"></el-table-column>
      <el-table-column label="类型" prop="type"></el-table-column>
      <el-table-column label="示例值" width="300" prop="example"></el-table-column>
      <el-table-column label="描述" prop="describe" width="300"></el-table-column>
    </el-table>
    <custom_title> 返回结果</custom_title>
    <p>
      业务系统处理后同步返回给支付中心，返回字符串 success 或 ok
      则表示成功，不论大小写，否则表示处理失败，支付中心会再次通知业务系统。（通知频率为60/120/180/240/300,单位：秒）
    </p>
  </el-scrollbar>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
import Custom_title from '@/components/custom_title.vue';

const router = useRouter();
const onClick = () => {
  router.push('/manage/info');
};
const table_1 = [
  {
    fieldName: '商户ID',
    variableName: 'merchant_id',
    required: '是',
    type: 'long',
    example: '20000000',
    describe: '分配的商户号'
  },
  {
    fieldName: '商户支付单号',
    variableName: 'out_order_id',
    required: '是',
    type: 'String(30)',
    example: '20160427210604000490',
    describe: '商户支付订单号'
  },
  {
    fieldName: '通道编码',
    variableName: 'channel',
    required: '是',
    type: 'int',
    example: '9900',
    describe: '支付通道编号'
  },
  {
    fieldName: '支付金额',
    variableName: 'amount',
    required: '是',
    type: 'int',
    example: '100',
    describe: '支付金额,单位元'
  },

  {
    fieldName: '支付结果回调URL',
    variableName: 'notify_url',
    required: '是',
    type: 'String(128)',
    example: 'http://www.baidu.com',
    describe: '支付结果回调URL'
  },
  {
    fieldName: '附加参数',
    variableName: 'extra',
    required: '否',
    type: 'String(2048)',
    example: '支付100元',
    describe: '回调时原样返回'
  },
  {
    fieldName: '签名',
    variableName: 'sign',
    required: '是',
    type: 'String(32)',
    example: 'C380BEC2BFD727A4B6845133519F3AD6',
    describe: '签名值，详见签名算法'
  }
];
const table_2 = [
  {
    fieldName: '返回状态码',
    variableName: 'code',
    required: '是',
    type: 'int',
    example: '200',
    describe: '200/500此字段标识是否成功'
  },
  {
    fieldName: '错误信息',
    variableName: 'msg',
    required: '否',
    type: 'String(128)',
    example: '签名失败',
    describe: '当code=500时返回下单失败信息'
  },
  {
    fieldName: '内容主体',
    variableName: 'data',
    required: '否',
    type: 'JSON',
    example: "{order_id: 'Z01320123123405', url: 'http://a.b.com'}",
    describe: '支付请求成功，返回系统生成的支付订单号'
  }
];
const table_3 = [
  {
    fieldName: '商户ID',
    variableName: 'merchant_id',
    required: '是',
    type: 'long',
    example: '80000',
    describe: '分配的商户号'
  },
  {
    fieldName: '商户订单号',
    variableName: 'order_id',
    required: '是',
    type: 'String(30)',
    example: 'Z01202010070935094340418',
    describe: '支付中心生成的订单号'
  },
  {
    fieldName: '签名',
    variableName: 'sign',
    required: '是',
    type: 'String(32)',
    example: 'C380BEC2BFD727A4B6845133519F3AD6',
    describe: '签名值，详见签名算法'
  }
];
const table_4 = [
  {
    fieldName: '返回状态码',
    variableName: 'code',
    required: '是',
    type: 'int',
    example: '200',
    describe: '200/500此字段标识是否成功'
  },
  {
    fieldName: '错误信息',
    variableName: 'msg',
    required: '否',
    type: 'String(128)',
    example: '签名失败',
    describe: '当code=500时返回查询失败信息'
  },
  {
    fieldName: '订单状态',
    variableName: 'state',
    required: '是',
    type: 'String(30)',
    example: '	success',
    describe: 'success时表示订单已支付成功，paying表示正在处理'
  }
];
const table_5 = [
  {
    fieldName: '商户号',
    variableName: '	merchant_id',
    required: '是',
    type: 'iString(30)',
    example: '80000',
    describe: '商户号'
  },
  {
    fieldName: '支付单号',
    variableName: 'order_id',
    required: '否',
    type: 'String(30)',
    example: 'Z01201810090684',
    describe: '支付中心生成的订单号'
  },
  {
    fieldName: '商户订单号',
    variableName: 'out_order_id',
    required: '是',
    type: 'String(30)',
    example: '	20215487454189',
    describe: '商户提交的订单号'
  },
  {
    fieldName: '支付金额',
    variableName: '	amount',
    required: '是',
    type: 'long',
    example: '	100',
    describe: '支付金额,单位分'
  },
  {
    fieldName: '实际支付金额',
    variableName: 'real_amount',
    required: '是',
    type: 'long',
    example: '100',
    describe: '支付金额,单位分'
  },
  {
    fieldName: '附加参数',
    variableName: 'extra',
    required: '否',
    type: 'String(2048)',
    example: '		支付100元',
    describe: '回调时原样返回'
  },
  {
    fieldName: '状态',
    variableName: 'state',
    required: '是',
    type: 'String(10)',
    example: 'success',
    describe: 'success/fail 分别代表订单处理成功与失败'
  },
  {
    fieldName: '签名',
    variableName: 'sign',
    required: '是',
    type: 'String(128)',
    example: '	3B166CA71811D4A0FEC25D511A365ED3',
    describe: '签名'
  }
];
</script>
<style scoped>
.title_1 {
  font-size: var(--el-font-size-extra-large);
  color: var(--el-color-primary);
}

p {
  line-height: 24px;
}

.mb10 {
  margin-bottom: 10px;
}
</style>
