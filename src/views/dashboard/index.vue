<script setup lang="ts">

</script>

<template>
  <MainPage alias="">
    <p class="mt-4 text-sm">
      Element Plus team uses <b>weekly</b> release strategy under normal
      circumstance, but critical bug fixes would require hotfix so the actual
      release number <b>could be</b> more than 1 per week.
    </p>
    <div class="box">
      <div>
        <span>L1</span>
        <div class="zz color1" style="height: 10px"></div>
        <span>0分</span>
      </div>
      <div>
        <span>L2</span>
        <div class="zz color1" style="height: 20px"></div>
        <span>1万分</span>
      </div>
      <div>
        <span>L3</span>
        <div class="zz color1" style="height: 30px"></div>
        <span>2万分</span>
      </div>
      <div>
        <span>L4</span>
        <div class="zz color1" style="height: 50px"></div>
        <span>5万分</span>
      </div>
      <div>
        <span>L5</span>
        <div class="zz color2" style="height: 70px"></div>
        <span>10万分</span>
      </div>
      <div>
        <span>L6</span>
        <div class="zz color2" style="height: 100px"></div>
        <span>20万分</span>
      </div>
    </div>
  </MainPage>
</template>

<style scoped lang="less">
.box {
  display: flex;
  width: 400px;
  & > div {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    flex-flow: column-reverse;
    .zz {
      width: 10px;
      height: 0px;
      border-radius: 5px;
      transition: all .3s ease;
    }
    & > span:first-child {
      font-weight: 600;
      font-size: 14px;
    }
  }
}

.color1 {
  background: linear-gradient(#51251242, #6c3c12d1); /* 标准语法 */
}
.color2 {
  background: linear-gradient(#51251218, #6c3c1280); /* 标准语法 */
}
</style>
