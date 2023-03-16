"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromptsController = void 0;
const common_1 = require("@nestjs/common");
const create_prompt_dto_1 = require("./dtos/create-prompt.dto");
const update_prompt_dto_1 = require("./dtos/update-prompt.dto");
const prompts_services_1 = require("./prompts.services");
let PromptsController = class PromptsController {
    constructor(promptService) {
        this.promptService = promptService;
    }
    findAll() {
        return this.promptService.findAll();
    }
    createPrompt(body) {
        return this.promptService.create(body.content, body.category, body.author_id);
    }
    async listCategoryPrompts(category) {
        const prompt = await this.promptService.findByCategory(category);
        if (!prompt) {
            throw new common_1.NotFoundException('Prompt not found');
        }
        return prompt;
    }
    async getPrompt(id) {
        const prompt = await this.promptService.findOne(id);
        if (!prompt) {
            throw new common_1.NotFoundException('Prompt not found');
        }
        return prompt;
    }
    async getByAuthor(id) {
        const prompt = await this.promptService.findByAuthor(id);
        if (!prompt) {
            throw new common_1.NotFoundException('No prompts found');
        }
        return prompt;
    }
    removePrompt(id) {
        return this.promptService.remove(parseInt(id));
    }
    updatePrompt(id, body) {
        return this.promptService.update(id, body);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PromptsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_prompt_dto_1.CreatePromptDto]),
    __metadata("design:returntype", void 0)
], PromptsController.prototype, "createPrompt", null);
__decorate([
    (0, common_1.Get)('/category/:category'),
    __param(0, (0, common_1.Param)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PromptsController.prototype, "listCategoryPrompts", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PromptsController.prototype, "getPrompt", null);
__decorate([
    (0, common_1.Get)('/author/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PromptsController.prototype, "getByAuthor", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PromptsController.prototype, "removePrompt", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_prompt_dto_1.UpdatePromptDto]),
    __metadata("design:returntype", void 0)
], PromptsController.prototype, "updatePrompt", null);
PromptsController = __decorate([
    (0, common_1.Controller)('/prompts'),
    __metadata("design:paramtypes", [prompts_services_1.PromptsService])
], PromptsController);
exports.PromptsController = PromptsController;
//# sourceMappingURL=prompts.controller.js.map