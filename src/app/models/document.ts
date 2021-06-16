

export interface Document
{
  id?;
  file_path?;
}

export interface PartnerDocumentType {
  id: number;
  airport: any;
  airport_id: number;
  description: string;
  document_name: string;
  download_link: string;
  has_exp_date: boolean;
  has_extra_data: boolean;
  has_file: boolean;
  label_extra_data: string;
  notes: string;
  required: boolean;
  seaport: any;
  seaport_id: number;
  show_to_partner: boolean;
  type:  1 | 2 | 3; //1 FOR PARTNER, 2 FOR DRIVER, 3 FOR VEHICLE
  input_type: 1 | 2 | 3;
  updated_at: Date;
  created_at: Date;
  deleted_at: Date;
  submitted;
  document?;
  entity_id?;
}
