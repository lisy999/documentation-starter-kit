import { Button } from "antd";
import { decryptData, TransformData } from "./test1";
import React from "react";
export default function Test1() {
  const onclick = async () => {
    TransformData(
      `SELECT LEFT(WORK_DATE,6) AS 统计日期, SUM(CONFIRM_WGT)/10000 AS "鲅鱼圈2#烧2小时烧结矿产量", CASE WHEN (SUM(CONFIRM_WGT)/10000 < 最小值 or SUM(CONFIRM_WGT)/10000 > 最大值) then 1 else 0 end as expe FROM ads_index.ods_agi3z1_tmmirc1 WHERE DATA_RESOURCE_P = '生产实绩_烧结' AND LEFT(WORK_DATE,6) >='开始时间' and LEFT(WORK_DATE,6) <='结束时间' AND PROD_UNIT_CODE = 'B104' GROUP BY LEFT(WORK_DATE,6) ORDER BY LEFT(WORK_DATE,6) DESC`
    ).then((res) => {
      console.log(res, "rrrrrrrr");
      decryptData(res).then((res) => {
        console.log(res, "res2");
      });
    });
  };
  return (
    <div>
      <Button onClick={onclick}>按钮</Button>
    </div>
  );
}
