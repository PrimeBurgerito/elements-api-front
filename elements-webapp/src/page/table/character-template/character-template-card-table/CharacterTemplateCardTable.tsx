import React, { useEffect, useState } from 'react';
import { ICharacterTemplate } from '@type/Character';
import { CharacterTemplateV2Api } from '@shared/api/CharacterTemplateApi';
import './character-template-card-table.scss';
import CharacterTemplateCard from './component/CharacterTemplateCard';

const CharacterTemplateCardTable: React.FC = () => {
  const [templates, setTemplates] = useState<ReadonlyArray<ICharacterTemplate>>(null)

  useEffect(() => {
    void getNewTemplates();
  }, []);

  const getNewTemplates = async () => {
    const newTemplates = await CharacterTemplateV2Api.getAll();
    setTemplates(newTemplates);
  }

  const renderCard = (template: ICharacterTemplate): React.ReactElement => {
    return <CharacterTemplateCard
      key={template.id}
      template={template}
    />
  }

  return (
    <div className="container">
      {templates ? templates.map(renderCard) : <div>Loading...</div>}
    </div>
  );
}

export default CharacterTemplateCardTable;
