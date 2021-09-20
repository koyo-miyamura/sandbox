RSpec.describe Sample do
  it 'has a version number' do
    expect(Sample::VERSION).not_to be nil
  end

  context 'Sample#version' do
    subject { Sample.version }
    it 'is same Sample::VERSION' do
      is_expected.to match(Sample::VERSION)
    end
  end
end
