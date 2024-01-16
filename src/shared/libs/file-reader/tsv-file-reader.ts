import { FileReader } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';
import {Accommodation, Offer, UserType, City, Amenity} from '../../types/index.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([title, description, postDate, city, previewImage,
        images, isPremium, isFavorite, rating, type, bedrooms,
        maxGuests, price, amenities, latitude, longitude, name, email,
        userType, password, avatarUrl = 'default.jpg']) => ({
        title,
        description,
        postDate: new Date(postDate),
        city: City[city as keyof typeof City],
        previewImage,
        images: images.split(';'),
        isPremium: JSON.parse(isPremium),
        isFavorite: JSON.parse(isFavorite),
        rating: Number.parseInt(rating, 10),
        type: Accommodation[type as keyof typeof Accommodation],
        bedrooms: Number.parseInt(bedrooms, 10),
        maxGuests: Number.parseInt(maxGuests, 10),
        price: Number.parseInt(price, 10),
        amenities: amenities.split(';').map((amenity) => Amenity[amenity as keyof typeof Amenity]),
        host: {
          name,
          email,
          password,
          type: UserType[userType as keyof typeof UserType],
          avatarUrl
        },
        location: {
          latitude: Number.parseFloat(latitude),
          longitude: Number.parseFloat(longitude)
        },
      }));
  }
}
