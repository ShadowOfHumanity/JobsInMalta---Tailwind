
import MidText from '../Components/MidText'
import LongSearchBar from '../Components/LongSearchBar'
import JobCards from '../Components/JobCards'
import WebFooter from '../Components/Footer'

const SearchPage = () => {
  return (
    <>
      <MidText>Explore opportunities</MidText>
      <LongSearchBar /> {/* includes filters*/}


      {/* map JobCards */}
      <JobCards
        companyName="Starbucks"
        vacancyName="Barista"
        vacancyDescription='We are looking for young, passionate workers to work in Starbucks Naxxar, to learn and help us build our starbucks empire!'
        vacancyTags={['Coffee', 'Love', 'Art']}
        companyImageUrl={'https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/800px-Starbucks_Corporation_Logo_2011.svg.png'} />

      <JobCards
        companyName="European Union"
        vacancyName="Soldiers"
        vacancyDescription="Here at the EU, we're looking to enhance, and grow our army due to unseen threats. Apply now, and be a prime European Citizen."
        vacancyTags={['Army', 'Benifits', 'Urgent']}
        companyImageUrl={'https://cdn.britannica.com/66/96866-004-F622FD38/Flag-European-Union.jpg?s=1500x700&q=85'} />
    </>
  )
}

export default SearchPage