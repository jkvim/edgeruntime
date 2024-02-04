# Edge Runtime

A code playground with build-in Tailwind.CSS for AI

## Language support
* HTML
* JS
* CSS


## Play with ChatGPT

Now ChatGPT support tag any GPTs in your conservation, we can ask the [gpt](https://chat.openai.com/g/g-NFQikIaKU-code-runner) to run HTML/JS/CSS code

```
you: How to create graident background with Tailwind 

ChatGPT: Sure, here is the code ...

you: @Code Runner run above code
```

![use-with-chat-gpt](./public/images/chat-gpt.png)


### Examples
* [Ask chat gpt to create home-page](https://www.edgeruntime.ai/html/AY9YDAtysKdC)

## Development

1. Install Dependencies
```
yarn install
```

2. Create a redis instance in [Upstash](https://upstash.com/)

3. Config below variables in vercel

```
UPSTASH_REDIS_REST_TOKEN=""
UPSTASH_REDIS_REST_URL=""
```
4. Start the server
```
yarn dev
```

5. Create a API key for your self with curl
```
 curl -X POST "http://localhost:3002/api/key"
```