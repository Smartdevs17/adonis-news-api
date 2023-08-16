import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {schema} from '@ioc:Adonis/Core/Validator'
import New from "App/Models/New"

export default class NewsController {
  //get all news
  public async index({response}: HttpContextContract) {
    const allNews = await New.all();
    response.status(200)
    return {
      success: true,
      message: "all news",
      data: allNews
    }
  }
  // add news
  public async store({request,response }: HttpContextContract) {
    const newsSchema = schema.create({
      author: schema.string({trim: true}),
      title: schema.string({trim: true}),
      description: schema.string({trim: true}),
      published: schema.date(),
      is_active: schema.boolean(),
    });
    const payload = await request.validate({schema: newsSchema});
    try {
      const addedNews = await New.create(payload);
      response.status(201)
      return{
        success: true,
        message: "news added successfully",
        data: addedNews
      }
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "an error occurred while saving news"
      }
      
    }
  }

  public async show({params,response}: HttpContextContract) {
    const id = params.id;
    try {
      const getNews = await New.find(id);
      if(!getNews) {
        response.status(404);
        return {success: false, message:"news not found"};
      }
      response.status(200);
      return {
        success: true,
        message: "requested news",
        data: getNews
      }
    } catch (error) {
      console.log(error);
      response.status(500)
      return {success: false, message: "internal error occurred"};
      
    }
  }

  public async update({params,request,response}: HttpContextContract) {
    const id = params.id;
    const body = request.body();
    try {
      const updatedNews = await New.updateOrCreate({id: id},body);
      response.status(200);
      return {
        success: true,
        message: "news is updated successfully",
        data: updatedNews
      }
    } catch (error) {
      console.log(error);
      response.status(500);
      return {success: false,
        message: "internal server error"
      }
      
    }
  }

  public async destroy({params,response}: HttpContextContract) {
    const id = params.id;
    try {
      const deletedNews = await New.find(id);
      if (!deletedNews) {
        response.status(400);
        return {
          success : true,
          message: "no news exists with this id"
        }
      } else {
        await deletedNews.delete();
          response.status(200);
          return {
            success: true,
            message: "news successfully deleted",
            data: deletedNews
          }
      }
    } catch (error) {
      console.log(error);
      response.status(500);
      return {
        success: false,
        message: "internal server error"
      }
    }
  }
}
