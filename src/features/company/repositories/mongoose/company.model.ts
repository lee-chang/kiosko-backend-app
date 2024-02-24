import { model, Schema } from 'mongoose'
import { UuidGenerator } from '../../../../core/utils/UuidGenerator.util'
import { ICompany } from '../../interfaces/company.interface'



const CompanySchema: Schema = new Schema<ICompany & {_id:string}>(
  {
    _id: {
      type:String
    },
    id: {
      type: String,
      unique: true,
      key: true      
    },
    name: {
      type: String,
      require: true,
      trim: true,

    },
    admin: [
      {
        type: String,
        ref: 'User',
      },
    ],
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    id: true,
    toJSON: {
      transform(doc, ret) {
        delete ret._id
      },
    },
    timestamps: true,
    versionKey: false,
  }
)

CompanySchema.pre('save', async function(next) {
  // Crea un id de ira
  const uuid = new UuidGenerator().generate();

  // Asigna el id de ira a los atributos _id e id
  this._id = uuid;
  this.id = uuid;

  // Continúa con el proceso de guardado
  next();
});

const CompanyModel = model<ICompany>('Company', CompanySchema)
export default CompanyModel
