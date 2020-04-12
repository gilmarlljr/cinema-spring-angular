import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AbstractFormItem } from '../components/abstracts/abstract-form/abstract-form.directive'
import { FormInputComponent } from '../components/abstracts/abstract-form/form-input.component'
import { FormImageInputComponent } from '../components/abstracts/abstract-form/form-image-input.component'
import { FormSelectComponent } from '../components/abstracts/abstract-form/form-select.component'
import { IFormModel, FormModelParms, IModel } from './model'
import { IMovie } from './movie.model'
import { IRoom } from './room.model'
import { IUser } from './user.model'
import { FormDatePickerComponent as FormDateTimePickerComponent } from '../components/abstracts/abstract-form/form-datepicker.component'
import { UserService } from '../services/http/user/user.service'
import { RoomService } from '../services/http/room/room.service'
import { MovieService } from '../services/http/movie/movie.service'
import { ISession } from './session.model'

export interface IMovieSession extends IModel {
  id?: string
  movie?: IMovie
  sessions?: ISession[]

}

export class MovieSessionModel implements IFormModel {

  public state: IMovieSession = {};

  get id() {
    return this.state.id;
  }

  get movie() {
    return this.state.movie;
  }

  get sessions() {
    return this.state.sessions;
  }

  setId(id: string) {
    this.state.id = id;
  }


  setMovie(movie: IMovie) {
    this.state.movie = movie;
  }

  setSessions(sessions: ISession[]) {
    this.state.sessions = sessions;
  }
  constructor(id: string, movie: IMovie, sessions: ISession[]) {
    this.setId(id);
    this.setMovie(movie);
    this.setSessions(sessions);
  }

  getFormGroup(): FormGroup {
    return null;
  }

  getFormItens(params: FormModelParms): any[] {
    let id = new AbstractFormItem(FormInputComponent, { title: "Id", name: "id", hidden: true })
    let dateTime = new AbstractFormItem(FormDateTimePickerComponent, { title: "Data e Hora", name: "dateTime" })

    let room = new AbstractFormItem(FormSelectComponent, { title: "Sala", name: "room", options: [] })
    this.setRoomOptions(params['roomService'], room)
    let movie = new AbstractFormItem(FormSelectComponent, { title: "Filme", name: "movie", options: [] })
    this.setMovieOptions(params['movieService'], movie)

    let userService: UserService = params['userService']
    return [id, dateTime, room, movie]
  }

  async setRoomOptions(roomService: RoomService, roomItem: AbstractFormItem) {
    let rooms = (await roomService.getAll().toPromise()).data
    rooms.forEach(room => {
      roomItem.data.options.push({
        value: room,
        viewValue: room.name
      })
    });
  }

  async setMovieOptions(movieService: MovieService, movieItem: AbstractFormItem) {
    let movies = (await movieService.getAll().toPromise()).data
    movies.forEach(movie => {
      movieItem.data.options.push({
        value: movie,
        viewValue: movie.title
      })
    });
  }
}

