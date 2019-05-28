import { Button, FormGroup, Intent, OL } from '@blueprintjs/core';
import { TimePicker } from '@blueprintjs/datetime';
import MultiStringSelect from '@component/ElementsForm/element/MultiStringSelect';
import { ITimeRange, ITiming } from '@type/requirement';
import * as React from 'react';
import { useState } from 'react';
import './element.scss';

const WEEKDAYS = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
const MONTH_DAYS = [...Array(31).keys()].map((n) => (n + 1).toString());
const MONTHS = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
  'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];

interface ITimingProps {
  onChange: (change: ITiming) => void;
}

const TimingInput = (props: ITimingProps): JSX.Element => {
  const [timing, setTiming] = useState<ITiming>({});
  const [times, setTimes] = useState<ITimeRange[]>([]);

  const handleChange = (key: 'weekdays' | 'monthDays' | 'months' | 'time', values) => {
    const newTiming = { ...timing, [key]: values };
    setTiming(newTiming);
    props.onChange(newTiming);
  };

  const changeWeekdays = (values: string[]) => {
    const numValues = values.map((weekday) => WEEKDAYS.indexOf(weekday) + 1);
    handleChange('weekdays', numValues);
  };

  const changeMonthDays = (values: string[]) => {
    handleChange('weekdays', values.map(Number));
  };

  const addTimeRange = () => {
    setTimes([...times, { start: new Date(), end: new Date() }]);

    const newTimeRangeList = timing.time ? timing.time : [];
    const dateString = mapDateToString(new Date());
    newTimeRangeList.push({ start: dateString, end: dateString });
    handleChange('time', newTimeRangeList);
  };

  const changeTimeRange = (idx: number, type: 'start' | 'end', value: Date) => {
    const newTimeRangeList = [...times];
    newTimeRangeList[idx][type] = value;
    setTimes(newTimeRangeList);

    const newTimeRangeStringList = [...timing.time];
    newTimeRangeStringList[idx][type] = mapDateToString(value);
    handleChange('time', newTimeRangeStringList);
  };

  const mapDateToString = (date: Date): string => {
    const hours = date.getHours().toString();
    const minutes = date.getMinutes().toString();
    return `${hours.length < 2 ? '0' + hours : hours}:${minutes.length < 2 ? '0' + minutes : minutes}`;
  };

  return (
    <>
      <FormGroup label="Weekdays">
        <MultiStringSelect values={WEEKDAYS} onChange={changeWeekdays} />
      </FormGroup>
      <FormGroup label="Month days">
        <MultiStringSelect values={MONTH_DAYS} onChange={changeMonthDays} />
      </FormGroup>
      <FormGroup label="Months">
        <MultiStringSelect values={MONTHS} onChange={(values) => handleChange('months', values)} />
      </FormGroup>
      <p>Time ranges</p>
      <Button intent={Intent.PRIMARY} icon="time" onClick={addTimeRange}>New time range</Button>
      <br />
      <OL>
        {timing.time && times.map((time: ITimeRange, idx) => (
          <li key={`time-range-${idx}`}>
            <div className="time-range-container">
              <FormGroup label="Start time">
                <TimePicker value={time.start as Date} onChange={(date) => changeTimeRange(idx, 'start', date)} />
              </FormGroup>
              <FormGroup label="End time">
                <TimePicker value={time.end as Date} onChange={(date) => changeTimeRange(idx, 'end', date)} />
              </FormGroup>
            </div>
          </li>
        ))}
      </OL>
    </>
  );
};

export default TimingInput;
