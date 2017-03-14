import { Player } from './player';
import { Board, BoardPiece } from './board';
import { Utils } from './utils';

export class PlayerHuman extends Player {
  clickPromiseResolver: any;

  constructor(boardPiece: BoardPiece, canvas: HTMLCanvasElement) {
    super(boardPiece, canvas)
    this.clickPromiseResolver = null

    canvas.addEventListener('click', (evt) => {
      try {
        this.handleClick(evt)
      } catch (e) {
        console.error(e)
      }
    })
  }

  private handleClick(event: MouseEvent) {
    const rect = this.canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const column = Utils.getColumnFromCoord({x: x, y: y})
    this.clickPromiseResolver(column)
  }

  async getAction(board: Board): Promise<number> {
    return new Promise<number>(r => this.clickPromiseResolver = r)
  }
}
