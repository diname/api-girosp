import { Request, Response } from 'express'
import { CreateProductService } from '../../services/product/CreateProductService'

class CreateProductController {
  async handle(req: Request, res: Response) {
    const { descricao, valorUnitario, idCategoria } = req.body
    const productService = new CreateProductService()

    const product = await productService.execute({
      descricao,
      valorUnitario,
      idCategoria
    })

    return res.json(product)
  }
}

export { CreateProductController }
