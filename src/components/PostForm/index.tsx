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

export default function PostForm({ show, onClose }: Props) {
  const [formValues, setFormValues] = useState<FormValues>({});
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
