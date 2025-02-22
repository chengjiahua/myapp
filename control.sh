#!/bin/bash

# 设置日志文件路径
LOG_FILE="npm_dev.log"
PID_FILE="npm_dev.pid"

start() {
  # 检查是否已在运行
  if [ -f "$PID_FILE" ] && kill -0 $(cat "$PID_FILE"); then
    echo "npm run dev 已经在运行"
    exit 1
  fi

  # 启动 npm run dev
  nohup npm run dev >> "$LOG_FILE" 2>&1 &

  # 获取进程ID并保存
  echo $! > "$PID_FILE"
  echo "npm run dev 启动成功，日志输出到 $LOG_FILE"
}

stop() {
  # 检查是否在运行
  if [ ! -f "$PID_FILE" ] || ! kill -0 $(cat "$PID_FILE"); then
    echo "npm run dev 未在运行"
    exit 1
  fi

  # 停止进程
  kill $(cat "$PID_FILE")
  rm -f "$PID_FILE"
  echo "npm run dev 已停止"
}

status() {
  if [ -f "$PID_FILE" ] && kill -0 $(cat "$PID_FILE"); then
    echo "npm run dev 正在运行"
  else
    echo "npm run dev 未运行"
  fi
}

# 判断传入的参数并执行相应操作
case "$1" in
  start)
    start
    ;;
  stop)
    stop
    ;;
  status)
    status
    ;;
  *)
    echo "用法: $0 {start|stop|status}"
    exit 1
    ;;
esac