import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class New extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public author: string

  @column()
  public title: string

  @column()
  public description: string

  @column.dateTime({autoCreate: true})
  public published: DateTime

  @column()
  public is_active: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
