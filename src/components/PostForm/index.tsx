import React, { useState } from 'react';
import SidePanel from '../SidePanel';

import './PostForm.css';
import MakesSelector from '../MakesSelector';
import { Brand } from '../../graphql/hooks/useBrands';
import VehicleSelector from '../VehicleSelector';
import TextInput from '../TextInput';
import { Vehicle } from '../../graphql/hooks/useVechicleByBrand';
import Button, { ButtonColors } from '../Button';
import useCreatePost from '../../graphql/hooks/useCreatePost';
import Skeleton from '../Skeleton';
import { useProfileContext } from '../../context/ProfileContext';

type Props = {
  show: boolean;
  onClose?: (refresh: boolean) => void;
};

type FormValues = {
  brand?: Brand | null;
  vehicle?: Vehicle | null;
  price?: number;
  year?: number;
  mileage?: number;
  description?: string;
  images?: string[];
};

const test = {
  brand: {
    __typename: 'Brand',
    name: 'Harley-Davidson',
    img: 'https://logos-marques.com/wp-content/uploads/2021/02/Harley-Davidson-Logo.png',
    _id: '655f77fc4a26857b76d336f2',
  },
  vehicle: {
    __typename: 'Vehicle',
    _id: '655f77fc4a26857b76d336f7',
    name: 'Harley Davidson Fat Boy',
    model: 'Fat Boy',
    avgPrice: 20000,
    horsepower: 65,
    torque: 90,
    engine: 'V-Twin',
    weight: 710,
  },
  price: '9250',
  year: '2012',
  mileage: '20100',
  description:
    'The 2012 Harley-Davidson® Softail® Fat Boy® FLSTF is one of the quintessential cruiser motorcycles. Hearkening to the "hardtail" choppers of the \'60\'s and \'70\'s, the Harley-Davidson Fat Boy motorcycle keeps that heritage alive more than forty years later. The FLSTF Fat Boy is the original "fat custom" bike—laid-back and luxurious with an unmistakable profile on the road. New for 2012, the Harley Fat Boy features a new, larger air-cooled Twin Cam 103™ Harley engine with 6-speed cruise drive transmission, providing more power for passing, hill-climbing, and riding with passenger and luggage. Take a seat on this Harley and get the experience of one of the 2012 Harley cruiser motorcycles. Learn about other Harley Softail motorcycles in addition to this cruiser. Look at the Heritage Softail® Classic too, this classic motorcycle is ready for the road. If you like choppers, be sure to take a look at the Fat Boy® Lo, another of the custom Harley motorcycles.',
  images: [
    'https://cdn1.cycletrader.com/v1/media/656630436f43677a310d1666.jpg?width=1024&height=768&quality=70&bestfit=true&upsize=true&blurBackground=true&blurValue=100&upsize=true',
    'https://cdn1.cycletrader.com/v1/media/656630446f43677a310d1667.jpg',
    'https://cdn1.cycletrader.com/v1/media/656630446f43677a310d1668.jpg',
    'https://cdn1.cycletrader.com/v1/media/656630456f43677a310d166c.jpg',
  ],
};

export default function PostForm({ show, onClose }: Props) {
  const [formValues, setFormValues] = useState<FormValues>(
    JSON.parse(JSON.stringify(test)),
  );
  const [iamgeText, setIamgeText] = useState('');
  const { handleCreatePost, data, loading } = useCreatePost();
  const { profile } = useProfileContext();

  function handleSave() {
    if (!formValues.brand || !formValues.vehicle) return;
    if (!profile?._id) return;
    if (!formValues.price) return;
    if (!formValues.year) return;
    if (!formValues.mileage) return;
    if (!formValues.description) return;

    handleCreatePost({
      vehicle: formValues.vehicle._id,
      priceNow: formValues.price ? parseInt(formValues.price.toString()) : 0,
      year: formValues.year ? parseInt(formValues.year.toString()) : 0,
      mileage: formValues.mileage ? parseInt(formValues.mileage.toString()) : 0,
      description: formValues.description,
      images: formValues.images || [],
      user: profile?._id,
      brand: formValues.brand?._id,
      priceBefore: formValues.price ? parseInt(formValues.price.toString()) : 0,
      views: 0,
    });
  }

  function handleCancel() {
    setFormValues({});
    onClose && onClose(false);
  }

  function updateValue(key: keyof FormValues, value: any) {
    setFormValues({ ...formValues, [key]: value });
    if (key === 'images') setIamgeText('');
  }

  React.useEffect(() => {
    if (!data) return;
    if (data?.createPost?._id) {
      onClose && onClose(true);
    }
  }, [data]);
  return (
    <SidePanel
      show={show}
      loading={loading}
      onClose={handleCancel}
      primaryAction={handleSave}
      secondaryAction={handleCancel}
    >
      <div className="form">
        <div className="form-row">
          <Skeleton loading={loading} flex>
            <MakesSelector
              onChange={(value) => updateValue('brand', value)}
              brandSelectedID={formValues.brand?._id}
            />
          </Skeleton>
        </div>
        <div className="form-row">
          <Skeleton loading={loading} flex>
            <VehicleSelector
              brandFilter={formValues.brand}
              onChange={(value) => updateValue('vehicle', value)}
              vehicleSelectedID={formValues.vehicle?._id}
            />
          </Skeleton>
        </div>
        <div className="form-row">
          <Skeleton loading={loading} flex>
            <TextInput
              type="number"
              placeholder="Price"
              value={formValues.price?.toString() || ''}
              onChange={(value) => updateValue('price', value)}
            />
          </Skeleton>
        </div>
        <div className="form-row">
          <Skeleton loading={loading} flex>
            <TextInput
              type="number"
              placeholder="Year"
              value={formValues.year?.toString() || ''}
              onChange={(value) => updateValue('year', value)}
            />
          </Skeleton>
          <Skeleton loading={loading} flex>
            <TextInput
              type="number"
              placeholder="Mileage"
              value={formValues.mileage?.toString() || ''}
              onChange={(value) => updateValue('mileage', value)}
            />
          </Skeleton>
        </div>
        <div className="form-row">
          <Skeleton loading={loading} flex>
            <TextInput
              placeholder="Description"
              value={formValues.description || ''}
              onChange={(value) => updateValue('description', value)}
            />
          </Skeleton>
        </div>
        <div className="form-row">
          <Skeleton loading={loading} flex>
            <TextInput
              placeholder="Image URL"
              value={iamgeText}
              onChange={setIamgeText}
            />
          </Skeleton>
          <Skeleton loading={loading}>
            <Button
              text="Add"
              onClick={() =>
                updateValue('images', [...(formValues.images || []), iamgeText])
              }
            />
          </Skeleton>
        </div>
        <div className="images-container">
          {formValues.images?.map((image, i) => (
            <Skeleton loading={loading} key={image + i}>
              <div className="image-container">
                <img src={image} alt="car" className="image" />
                <div
                  className="image-cancel-container"
                  onClick={() =>
                    updateValue(
                      'images',
                      (formValues.images || []).filter(
                        (_, index) => index !== i,
                      ),
                    )
                  }
                >
                  x
                </div>
              </div>
            </Skeleton>
          ))}
        </div>
      </div>
    </SidePanel>
  );
}
