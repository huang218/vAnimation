<script setup lang="ts">
import { onMounted } from 'vue'

function getOverlappingIntervals(intervals, values) {
  const ranges = intervals.slice() // 复制 intervals 数组
  ranges.sort((a, b) => a[0] - b[0])

  const overlappingIndexes = []

  for (let i = 0; i < ranges.length - 1; i++) {
    if (ranges[i][1] > ranges[i + 1][0]) {
      overlappingIndexes.push(i, i + 1)
    }
  }

  for (let i = 0; i < values.length; i++) {
    const value = values[i]
    for (let j = 0; j < ranges.length; j++) {
      const [start, end] = ranges[j]
      if ((value === Infinity && end === Infinity) || (value >= start && value <= end)) {
        overlappingIndexes.push(j)
      }
    }
  }

  return overlappingIndexes
}

function isOverlappingIntervals(intervals, values) {
  const ranges = intervals.slice() // 复制 intervals 数组
  ranges.sort((a, b) => a[0] - b[0])

  for (let i = 0; i < ranges.length - 1; i++) {
    if (ranges[i][1] > ranges[i + 1][0]) {
      return true
    }
  }

  for (let i = 0; i < values.length; i++) {
    const value = values[i]
    for (let j = 0; j < ranges.length; j++) {
      const [start, end] = ranges[j]
      if ((value === Infinity && end === Infinity) || (value >= start && value <= end)) {
        return true
      }
    }
  }

  return false
}

onMounted(() => {
  // 区间与固定值 判断是否重叠

  function isIntervalOverlapping(interval1, interval2) {
    if (interval1.length === 1 && interval2.length === 1) {
      return interval1[0] === interval2[0]
    }

    const [start1, end1] = interval1
    const [start2, end2] = interval2

    return (start1 <= start2 && start2 <= end1) || (start2 <= start1 && start1 <= end2)
  }

  function getOverlappingIndexes(intervals) {
    const overlappingIndexes = []

    for (let i = 0; i < intervals.length; i++) {
      for (let j = i + 1; j < intervals.length; j++) {
        if (isIntervalOverlapping(intervals[i], intervals[j])) {
          overlappingIndexes.push(i, j)
        }
      }
    }

    return overlappingIndexes
  }

  const intervals = [[12, 23], [15]]

  const overlappingIndexes = getOverlappingIndexes(intervals)
  console.log(overlappingIndexes, 'overlappingIndexes') // Output: []
})
</script>
<template>
  <div>用户通知管理</div>
</template>
<style lang="less" scoped></style>
