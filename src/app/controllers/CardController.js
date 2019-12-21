import Card from '../models/Card';

class CardController {
  // tras todos os cards
  async index(req, res) {
    const cards = await Card.findAll();

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
    const nextId = await Card.nextId();

    const card = await Card.create({
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

    const cards = await Card.findAll();
    res.json(cards);
  }
}

export default new CardController();
