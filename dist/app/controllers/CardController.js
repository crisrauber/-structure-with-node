"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _Card = require('../models/Card'); var _Card2 = _interopRequireDefault(_Card);

class CardController {
  // tras todos os cards
  async index(req, res) {
    const cards = await _Card2.default.findAll();

    return res.json(cards);
  }

  // tras apenas o card especifico
  async show(req, res) {
    const { card } = req;
    return res.json(card);
  }

  // serve para armazenar os cards no banco
  async store(req, res) {
    const { title, content } = req.body;
    const nextId = await _Card2.default.nextId();

    const card = await _Card2.default.create({
      id: nextId,
      title,
      content,
    });

    return res.json(card);
  }

  // serve para atualizar algo no banco
  async update(req, res) {
    const { title, content } = req.body;
    const { card } = req;

    card.title = title;
    card.content = content;

    card.save();
    res.json(card);
  }

  // serve para deletar algo do banco
  async delete(req, res) {
    const { card } = req;

    await card.destroy();

    const cards = await _Card2.default.findAll();
    res.json(cards);
  }
}

exports. default = new CardController();
