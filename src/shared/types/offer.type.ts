import {City} from './city.enum.js';
import {Accommodation} from './accommodation.enum.js';
import {Amenity} from './amenity.enum.js';
import {User} from './user.type.js';
import {Location} from './location.type.js';


export type Offer = {
  title: string,
  description: string,
  postDate: Date,
  city: City,
  previewImage: string,
  images: string[],
  isPremium: boolean,
  isFavorite: boolean,
  rating: number,
  type: Accommodation,
  bedrooms: number,
  maxGuests: number,
  price: number,
  amenities: Amenity[],
  host: User,
  location: Location
}
