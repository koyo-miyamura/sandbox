class PeriodValidator < ActiveModel::Validator
  def validate(record)
    unless record.period.valid?
      record.errors.add(:start_at, 'は終了時間よりも前に設定してください')
    end
  end
end
