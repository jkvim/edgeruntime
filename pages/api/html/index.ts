import { kv } from "@vercel/kv";
import { nanoid } from "nanoid";
import { NextApiRequest, NextApiResponse } from "next";
import { API_KEY_PREFIX, HTML_KEY_PREFIX } from "@/constants/api";
import { baseUrl } from "@/constants/url";
import { Token } from "@/types/types";
import { serializeToken } from "../helper";
import { redis } from "../../../storage/redis";


/**
 * @swagger
 * /api/html:
 *   post:
 *     summary: preview HTML code with built-in Tailwind CSS
 *     description: This endpoint preview HTML code with built-in Tailwind CSS
 *     operationId: previewHTML
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       description: code to be converted
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PreviewHTMLRequest'
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PreviewHTMLResponse'
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized - Authentication credentials were missing or incorrect.
 *       429:
 *        description: Too many requests - Rate limit exceeded.
 *       500:
 *         description: Server error
 * components:
 *   securitySchemes:
 *     ApiKeyAuth:
 *       type: apiKey
 *       in: header
 *       name: x-api-key
 *   schemas:
 *     PreviewHTMLRequest:
 *       type: object
 *       properties:
 *         content:
 *           type: object
 *           properties:
 *             html:
 *               type: string
 *               description: the HTML code to be preview
 *             css:
 *               type: string
 *               description: the CSS code to be preview
 *             js:
 *               type: string
 *               description: the JavaScript code to be run
 *       required:
 *         - content
 *     PreviewHTMLResponse:
 *       type: object
 *       properties:
 *         link:
 *           type: string
 *           format: uri
 *           description: URL link to the preview the HTML code
 */
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method === 'POST') {
    if (!request.body.content) {
      return response.status(400).json({error: 'Bad Request, content is required'});
    }
    let id = nanoid(12);
    let IdExists = await redis.hgetall(`${HTML_KEY_PREFIX}${id}`);

    while (IdExists) {
      id = nanoid(12);
      IdExists = await redis.hgetall(`${HTML_KEY_PREFIX}${id}`);
    }

    const apiKey = request.headers['x-api-key'] as string;
    const token: Token | null = (await redis.hgetall(
      `${API_KEY_PREFIX}${apiKey}`,
    )) as Token;

    const { count = 0 } = serializeToken(token);
    console.log('[HTML id]', id);
    const { html = '', css = '', js = '' } = request.body.content ?? {};

    // TOOD: clean markdown of this key
    await redis.hset(`${API_KEY_PREFIX}${token.key}`, {...token, count: count + 1});
    await redis.hset(`${HTML_KEY_PREFIX}${id}`, {
      html,
      css,
      js,
      date: Date.now(),
    });
    return response.status(200).json({link: `${baseUrl}/html/${id}`});
  }
}