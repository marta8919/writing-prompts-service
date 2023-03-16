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
exports.PromptsService = void 0;
const common_1 = require("@nestjs/common");
const prompts_entity_1 = require("./prompts.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let PromptsService = class PromptsService {
    constructor(repo) {
        this.repo = repo;
        this.repo = repo;
    }
    findAll() {
        return this.repo.find();
    }
    findByCategory(category) {
        if (!category)
            throw new common_1.NotFoundException('No prompt on this category');
        return this.repo.find({ where: { category } });
    }
    create(prompt, category, author_id) {
        const prompt_created = this.repo.create({ prompt, category, author_id });
        return this.repo.save(prompt_created);
    }
    findOne(id) {
        if (!id)
            throw new common_1.NotFoundException('Prompt not found');
        return this.repo.findOne({ where: { id: id } });
    }
    findByAuthor(id) {
        if (!id)
            throw new common_1.NotFoundException('Author not found');
        return this.repo.findOne({ where: { author_id: id } });
    }
    async remove(id) {
        const prompt = await this.findOne(id);
        if (!id)
            throw new common_1.NotFoundException('No prompt found');
        this.repo.remove(prompt);
    }
    async update(id, attrs) {
        const prompt = await this.findOne(parseInt(id));
        if (!prompt)
            throw new common_1.NotFoundException('No prompt found');
        Object.assign(prompt, attrs);
        this.repo.save(prompt);
    }
};
PromptsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(prompts_entity_1.PromptsEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PromptsService);
exports.PromptsService = PromptsService;
//# sourceMappingURL=prompts.services.js.map