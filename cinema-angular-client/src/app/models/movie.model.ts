import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AbstractFormItem } from '../components/abstracts/abstract-form/abstract-form.directive'
import { FormInputComponent } from '../components/abstracts/abstract-form/form-input.component'
import { FormImageInputComponent } from '../components/abstracts/abstract-form/form-image-input.component'
import { FormSelectComponent } from '../components/abstracts/abstract-form/form-select.component'
import { IFormModel, FormModelParms, IModel } from './model'

export interface IMovie extends IModel {
  id?: string
  image?: string
  title?: string
  synopsis?: string
  duration?: number
  animationType?: string;
  audioType?: string;
}

export class MovieModel implements IFormModel {

  public state: IMovie = {};

  get id() {
    return this.state.id;
  }

  get image() {
    return this.state.image;
  }

  get title() {
    return this.state.title;
  }

  get synopsis() {
    return this.state.synopsis;
  }

  get duration() {
    return this.state.duration;
  }

  get animationType() {
    return this.state.animationType;
  }

  get audioType() {
    return this.state.audioType;
  }

  setId(id: string) {
    this.state.id = id;
  }

  setImage(image: string) {
    this.state.image = image;
  }

  setTitle(title: string) {
    this.state.title = title;
  }

  setSynopsis(synopsis: string) {
    this.state.synopsis = synopsis;
  }

  setDuration(duration: number) {
    this.state.duration = duration;
  }

  setAnimationType(animationType: string) {
    this.state.animationType = animationType;
  }

  setAudioType(audioType: string) {
    this.state.audioType = audioType;
  }


  constructor(id: string, image: string, title: string, synopsis: string, duration: number, animationType: string, audioType: string) {
    this.setId(id);
    this.setImage(image);
    this.setTitle(title);
    this.setSynopsis(synopsis);
    this.setDuration(duration);
    this.setAnimationType(animationType);
    this.setAudioType(audioType);


  }

  getFormGroup(): FormGroup {
    return new FormGroup({
      id: new FormControl(this.id),
      image: new FormControl(this.image),
      title: new FormControl(this.title, [Validators.required]),
      synopsis: new FormControl(this.synopsis, [Validators.required]),
      duration: new FormControl(this.duration, [Validators.required]),
      animationType: new FormControl(this.animationType, [Validators.required]),
      audioType: new FormControl(this.audioType, [Validators.required])
    })
  }

  getFormItens(params: FormModelParms): any[] {
    let imagem = new AbstractFormItem(FormImageInputComponent, { title: "Image", name: "image", placeholder: "Editar imagem do filme" })
    let id = new AbstractFormItem(FormInputComponent, { title: "Id", name: "id", hidden: true })
    let title = new AbstractFormItem(FormInputComponent, { title: "Titulo", name: "title", ws: params['ws'] })
    let synopsis = new AbstractFormItem(FormInputComponent, { title: "Sinopse", name: "synopsis" })
    let duration = new AbstractFormItem(FormInputComponent, { title: "Duração", name: "duration", type: 'number' })
    let animationType = new AbstractFormItem(FormSelectComponent, {
      title: "Tipo de Filme", name: "animationType", options: [
        { value: '3D', viewValue: '3D' },
        { value: '2D', viewValue: '2D' }
      ]
    })
    let audioType = new AbstractFormItem(FormSelectComponent, {
      title: "Tipo de Audio", name: "audioType", options: [
        { value: 'dubbed', viewValue: 'Dublado' },
        { value: 'subtitled', viewValue: 'Legendado' }
      ]
    })
    return [imagem, id, title, synopsis, duration, animationType, audioType]
  }
}

