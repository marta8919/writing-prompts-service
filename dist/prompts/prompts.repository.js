"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromptsRepository = void 0;
const common_1 = require("@nestjs/common");
const promises_1 = require("fs/promises");
let PromptsRepository = class PromptsRepository {
    async findOne(id) {
        const contents = await (0, promises_1.readFile)('prompts.json', 'utf8');
        const prompts = JSON.parse(contents);
        return prompts[id];
    }
    async findAll() {
        const contents = await (0, promises_1.readFile)('prompts.json', 'utf8');
        const prompts = JSON.parse(contents);
        return prompts;
    }
    async create(prompt) {
        const contents = await (0, promises_1.readFile)('prompts.json', 'utf8');
        const prompts = JSON.parse(contents);
        const id = Math.floor(Math.random() * 999);
        prompts[id] = { id, content: prompt };
        await (0, promises_1.writeFile)('prompts.json', JSON.stringify(prompts));
    }
};
PromptsRepository = __decorate([
    (0, common_1.Injectable)()
], PromptsRepository);
exports.PromptsRepository = PromptsRepository;
//# sourceMappingURL=prompts.repository.js.map