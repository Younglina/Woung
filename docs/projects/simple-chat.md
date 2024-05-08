---
title: 30行代码基于通义千问LLM实现本地简单的多轮对话
author: Younglina
date: '2024-05-08'
showAccessNumber: true
categories:
 - 项目
tags:
 - AI
---
Qwen是基于transformer的纯解码器语言模型的一个系列，
[Qwen1.5-0.5B-Chat](https://modelscope.cn/models/qwen/Qwen1.5-0.5B-Chat/summary) 是其中最小的一个型号，接下来我们将基于它在本地实现简单的多轮对话。

## 环境准备
- Python版本>3.8 -> python --version
- 安装PyTorch -> pip install torch torchvision
- 安装transformers库 -> pip install transformers

如果下载很慢可以设置阿里镜像
```
pip config set global.index-url https://mirrors.aliyun.com/pypi/simple/
pip config set install.trusted-host mirrors.aliyun.com
```

## 加载模型
```python
# from transformers import AutoTokenizer, AutoModelForCausalLM
# 如果后面模型下载很慢，可以使用阿里的modelscope -> pip install modelscope
from modelscope import AutoTokenizer, AutoModelForCausalLM

# AutoModelForCausalLM 根据你提供的模型名称，自动加载用于生成任务的模型类，适用于因果语言模型（如GPT系列），可以预测序列中的下一个元素
# AutoTokenizer 自动加载与模型匹配的分词器，用于文本的预处理和后处理

# 本地模型，如果有的话，可以直接加载
# 没有的话，可以通过下面的cache_dir来设置加载的时候缓存到这个路行
local_model = "./my_local_models/Qwen1.5-0.5B-Chat"
tokenizer = AutoTokenizer.from_pretrained(
    # 如果本地有模型，可以直接使用路径加载local_model
    # 如果没有，就直接写模型的名字，可以到 https://huggingface.co/models 或者 https://modelscope.cn/models 查看模型
    "Qwen/Qwen1.5-0.5B-Chat",
    # 自动检测并使用适合模型的dtype（数据类型）
    torch_dtype="auto",
    # 自动将模型分布在可用的设备上，如果指定了GPU，会尽量将模型的不同部分分配到GPU上以适应其大小。
    device_map="auto",
    # 缓存地址
    cache_dir=local_model,
)
# 保存到本地
tokenizer.save_pretrained(local_model)
model = AutoModelForCausalLM.from_pretrained(
    "Qwen/Qwen1.5-0.5B-Chat", cache_dir=local_model
)
model.save_pretrained(local_model)
```

## 设置聊天模板
```python
prompt = input("输入对话:")
if prompt == "q":
    break
messages = [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": prompt},
]
# 设置聊天模板
text = tokenizer.apply_chat_template(
    messages,
    # 是否将输出标记化。如果为 False，输出将是字符串。
    tokenize=False,
    # 可以确保模型生成文本时只会给出答复，而不会做出意外的行为，比如继续用户的消息。
    add_generation_prompt=True,
)
# print(text)
# add_generation_prompt=True的情况
# 输入对话:你好
# <|im_start|>system
# You are a helpful assistant.<|im_end|>
# <|im_start|>user
# 你好<|im_end|>
# <|im_start|>assistant

# False的情况
# 输入对话:你好
# <|im_start|>system
# You are a helpful assistant.<|im_end|>
# <|im_start|>user
# 你好<|im_end|>
```

## 为模型准备输入
```python
# 将格式化后的文本进行分词并转换成PyTorch张量
model_inputs = tokenizer([text], return_tensors="pt")
generated_ids = model.generate(
    # 对应的索引
    model_inputs.input_ids,
    # 生成的token数量
    max_new_tokens=512,
)
# print(model_inputs.input_ids)
# tensor([[151644,   8948,    198,   2610,    525,    264,  10950,  17847,     13,
#          151645,    198, 151644,    872,    198, 108386, 151645,    198, 151644,
#           77091,    198]])

# print(generated_ids)
# tensor([[151644,   8948,    198,   2610,    525,    264,  10950,  17847,     13,
#          151645,    198, 151644,    872,    198, 108386, 151645,    198, 151644,
#           77091,    198, 111308,   6313, 104139, 109944, 100364, 101214, 101037,
#           11319, 151645]])

# 去除生成序列中与输入重复的部分，仅保留新生成的部分。
generated_ids = [
    output_ids[len(input_ids) :]
    for input_ids, output_ids in zip(model_inputs.input_ids, generated_ids)
]
# print(generated_ids)
# [tensor([111308,   6313, 104139, 109944, 100364, 101214, 101037,  11319, 151645])]
```

## 解码生成文字
```python
# 调用解码器，将token ID 列表转换为字符串列表。
response = tokenizer.batch_decode(
    generated_ids,
    # 在解码时删除特殊字符。
    skip_special_tokens=True,
)[0]
print(f"回答:{response}")
# 回答:你好！很高兴为您服务。有什么可以帮助您的吗？
```

## 完整代码
```python
from modelscope import AutoTokenizer, AutoModelForCausalLM

local_model = "./my_local_models/Qwen1.5-0.5B-Chat"
tokenizer = AutoTokenizer.from_pretrained("Qwen/Qwen1.5-0.5B-Chat", torch_dtype="auto", device_map="auto", cache_dir=local_model)
tokenizer.save_pretrained(local_model)
model = AutoModelForCausalLM.from_pretrained("Qwen/Qwen1.5-0.5B-Chat", cache_dir=local_model)
model.save_pretrained(local_model)
while True:
    prompt = input("输入对话:")
    if prompt == "q":
        break
    messages = [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": prompt},
    ]
    text = tokenizer.apply_chat_template(messages, tokenize=False, add_generation_prompt=True)
    model_inputs = tokenizer([text], return_tensors="pt")
    generated_ids = model.generate(model_inputs.input_ids, max_new_tokens=512)
    generated_ids = [ output_ids[len(input_ids) :] for input_ids, output_ids in zip(model_inputs.input_ids, generated_ids)]
    response = tokenizer.batch_decode(generated_ids, skip_special_tokens=True)[0]
    print(f"回答:{response}")
```
