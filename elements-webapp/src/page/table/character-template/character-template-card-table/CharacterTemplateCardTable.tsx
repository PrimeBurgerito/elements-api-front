import React, { useEffect, useState } from 'react';
import { ICharacterTemplate } from '@type/Character';
import { characterTemplateRealmApi } from '@shared/api/CharacterTemplateApi';
import './character-template-card-table.scss';
import CharacterTemplateCard from './component/CharacterTemplateCard';
import CharacterTemplateCreateCard from './component/CharacterTemplateCreateCard';

const CharacterTemplateCardTable: React.FC = () => {
  const [templates, setTemplates] = useState<ReadonlyArray<ICharacterTemplate>>(null)

  useEffect(() => {
    void getNewTemplates();
  }, []);

  const getNewTemplates = async () => {
    const newTemplates = await characterTemplateRealmApi.find();
    setTemplates(newTemplates);
  }

  const renderCard = (template: ICharacterTemplate): React.ReactElement => {
    return <CharacterTemplateCard key={template.id} template={template} />
  }

  return (
    <div className="character-template-container">
      <CharacterTemplateCreateCard onCreate={getNewTemplates} />
      {templates ? templates.map(renderCard) : <div>Loading...</div>}
    </div>
  );
}

export default CharacterTemplateCardTable;
