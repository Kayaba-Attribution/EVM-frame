//SPDX-License-Identifier: MIT

pragma solidity 0.8.1;

// We need some util functions for strings.
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

// We need to import the helper functions from the contract that we copy/pasted.
import { Base64 } from "../libraries/Base64.sol";

contract MyEpicNFT is ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  

  // This is our SVG code. All we need to change is the word that's displayed. Everything else stays the same.
  // So, we make a baseSvg variable here that all our NFTs can use.
  string baseSvg = "<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMin meet' viewBox='0 0 350 350'><defs><radialGradient id='RadialGradient1'><stop offset='10%' stop-color='";
  string baseSvg2 = "'/><stop offset='100%' stop-color='blue'/></radialGradient><radialGradient id='RadialGradient2' cx='0.25' cy='0.25' r='0.25'><stop offset='0%' stop-color='red'/><stop offset='100%' stop-color='blue'/></radialGradient></defs><style>.base { fill: white; font-family: serif; font-size: 14px; }.heavy { font: italic 35px serif; fill: balck; }</style><rect width='100%' height='100%' rx='15' ry='15' fill='url(#RadialGradient1)'/><text x='50%' y='50%' class='heavy' dominant-baseline='middle' text-anchor='middle'>";

  // I create three arrays, each with their own theme of random words.
  // Pick some random funny words, names of anime characters, foods you like, whatever! 
  string[] firstWords = ["Perfect", "Invencible", "Limitless", "Sacred", "Demonic", "Divine"];
  string[] secondWords = ["Kills", "Necromancy", "Swords", "Spears", "Cast", "Intelect"];
  string[] colors = ["cyan", "red", "white", "green", "yellow", "gray", "purple"];
 
 event NewEpicNFTMinted(address sender, uint256 tokenId);
    constructor() ERC721("OP_MMCS_V1.1.0", "OPMMCS") {
        console.log("This is my NFT contract. Woah!");
    }


  // I create a function to randomly pick a word from each array.
    function pickRandomColor(uint256 tokenId) public view returns (string memory) {
    uint256 rand = random(string(abi.encodePacked("SECOND_WORD", Strings.toString(tokenId))));
    rand = rand % colors.length;
    return colors[rand];
  }
  function pickRandomFirstWord(uint256 tokenId) public view returns (string memory) {
    // I seed the random generator. More on this in the lesson. 
    uint256 rand = random(string(abi.encodePacked("FIRST_WORD", Strings.toString(tokenId))));
    // Squash the # between 0 and the length of the array to avoid going out of bounds.
    rand = rand % firstWords.length;
    return firstWords[rand];
  }

  function pickRandomSecondWord(uint256 tokenId) public view returns (string memory) {
    uint256 rand = random(string(abi.encodePacked("SECOND_WORD", Strings.toString(tokenId))));
    rand = rand % secondWords.length;
    return secondWords[rand];
  }

  function random(string memory input) internal pure returns (uint256) {
      return uint256(keccak256(abi.encodePacked(input)));
  }

  function getTotalNFTsMintedSoFar() external view returns (uint256) {
    return _tokenIds.current();
  }

  function makeAnEpicNFT() public {
    uint256 newItemId = _tokenIds.current();
    require(newItemId < 10, "SOLD OUT!");

    // We go and randomly grab one word from each of the three arrays.
    string memory first = pickRandomFirstWord(newItemId);
    string memory second = pickRandomSecondWord(newItemId);
    string memory color = pickRandomColor(newItemId);
    string memory combinedWord = string(abi.encodePacked(color, baseSvg2,  first, second));
    string memory name_ = string(abi.encodePacked(first, second));
  
    // I concatenate it all together, and then close the <text> and <svg> tags.
   string memory finalSvg = string(abi.encodePacked(baseSvg, combinedWord, "</text></svg>"));

        // Get all the JSON metadata in place and base64 encode it.
    string memory json = Base64.encode(
        bytes(
            string(
                abi.encodePacked(
                    '{"name": "',
                    // We set the title of our NFT as the generated word.
                    name_,
                    '", "description": "OP MMCS POWERS", "image": "data:image/svg+xml;base64,',
                    // We add data:image/svg+xml;base64 and then append our base64 encode our svg.
                    Base64.encode(bytes(finalSvg)),
                    '"}'
                )
            )
        )
    );

    // Just like before, we prepend data:application/json;base64, to our data.
    string memory finalTokenUri = string(
        abi.encodePacked("data:application/json;base64,", json)
    );



    console.log("\n--------------------");
    console.log(name_);
    console.log(string(abi.encodePacked("https://nftpreview.0xdev.codes/?code=",finalTokenUri))
);
    console.log("--------------------\n");

    _safeMint(msg.sender, newItemId);
  
    _setTokenURI(newItemId, finalTokenUri);
  
    _tokenIds.increment();
    console.log("An NFT w/ ID %s has been minted to %s", newItemId, msg.sender);

    emit NewEpicNFTMinted(msg.sender, newItemId);
  }
}